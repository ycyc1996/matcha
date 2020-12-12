import express, { Express } from 'express'
import path from 'path'
import { AppConfig, ControllerFactory } from './types'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import { createServerWebpackConfig, createClientWebpackConfig } from './webpack'
import createRouter from './isomorphic/createRouter'
import createApp from './isomorphic/createApp'
import { renderToString } from 'react-dom/server'

const getModuleAsync = async loader => {
  return (await loader()).default
}

const startApp = (appConfig: AppConfig) => {
  const { port, mode, root, src, publicPath, staticPath, out, publish } = appConfig

  const isProd = mode === 'production'
  const isDev = mode === 'development'

  const app: Express = express()

  app.listen(port, () => {
    console.info(`
    app start, listening port ${port}
    mode: ${mode}
    ---------------
    code:
         -- root: ${root}
         -- src: ${src}
         -- out: ${out}
         -- publish: ${publish}
    app:
         -- publicPath: ${publicPath}
         -- staticPath: ${staticPath}
         -- asserts: asserts
  `)
  })

  console.log(path.resolve(process.cwd(), appConfig.out))
  let serverRouter = isDev ? createRouter([]) : createRouter(require(path.join(process.cwd(), appConfig.out)).default)

  if (isDev) {
    webpack(createServerWebpackConfig(appConfig), async (err, stats: webpack.Stats) => {
      console.log(err)
      console.log(stats.toString({ colors: true }))
      const { outputPath } = stats.toJson()
      if (outputPath) {
        const mainPath = path.resolve(outputPath, 'index')
        delete require.cache[require.resolve(mainPath)]
        const _routes = (require(mainPath)).default
        serverRouter = createRouter(_routes)
      }
    })
  }

  const clientWebpackConfig = createClientWebpackConfig(appConfig)

  if (isDev) {
    app.use(webpackDevMiddleware(webpack(clientWebpackConfig), {
      publicPath: clientWebpackConfig.output.publicPath,
      serverSideRender: true,
      writeToDisk: true
    }))
  } else {
    console.log('static -> ', path.join(process.cwd(), appConfig.out, appConfig.staticPath))
    app.use(express.static(path.join(process.cwd(), appConfig.out, appConfig.staticPath)))
  }

  app.use(appConfig.publicPath, async (req, res) => {
    const asserts = isProd ? {} : res.locals.webpackStats.toJson().assetsByChunkName
    const route = serverRouter(req.path)

    if (!route) {
      res.end('404')
      return
    }

    const AppCtrlClass = await getModuleAsync(route.loader)

    const app = await createApp(AppCtrlClass as ControllerFactory<any>, {
      isServer: true,
      isClient: false,
      location: {},
      initialState: {}
    })

    const ctrl = app.getCtrl()
    const content = ctrl.ssr ? renderToString(app.renderView()) : ''
    const __InitialState__: any = ctrl.ssr ? ctrl.store?.getState() : null

    if (isProd) {
      res.end(`
        <html>
          <head>
              <title>matcha</title>
          </head>
          <body>
            <script>
              window.__InitialState__ = ${JSON.stringify(__InitialState__)}      
            </script>
            <div id="matcha-app-root">${content}</div>
          </body>
         </html>
      `)
      return
    }
    res.end(`
      <html>
        <head>
            <title>matcha</title>
        </head>
        <body>
          <script>
            window.__InitialState__ = ${JSON.stringify(__InitialState__)}      
          </script>
          <div id="matcha-app-root">${content}</div>
          
           
           <script src="${clientWebpackConfig.output.publicPath}${asserts.vendor[0]}"></script>
           <script src="${clientWebpackConfig.output.publicPath}${asserts.main[0]}"></script>
        </body>
       </html>
      `)
  })
}

export default startApp
