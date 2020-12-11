import express, { Express } from 'express'
import path from 'path'
import { AppConfig, ControllerFactory } from './types'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import { createServerWebpackConfig, createClientWebpackConfig } from './webpack'
import createRouter from './isomorphic/createRouter'
import createApp from './isomorphic/createApp'
import { renderToString } from 'react-dom/server'

const NODE_ENV = process.env.NODE_ENV || 'development'

const getModuleAsync = async loader => {
  return (await loader()).default
}

const startApp = (appConfig: AppConfig) => {
  const { port, mode, root, src, publicPath, staticPath, out, publish } = appConfig

  const app: Express = express()

  app.listen(port, () => {
    console.info(`
    app start, listening port ${port}
    node-env: ${NODE_ENV}
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

  const clientWebpackConfig = createClientWebpackConfig(appConfig)

  let serverRouter = createRouter([])
  webpack(createServerWebpackConfig(appConfig), async (err, stats: webpack.Stats) => {
    console.log(err)
    console.log(stats.toString({ colors: true }))
    const { outputPath } = stats.toJson()
    if (outputPath) {
      const mainPath = path.resolve(outputPath, 'main')
      delete require.cache[require.resolve(mainPath)]
      const _routes = (require(mainPath)).default
      serverRouter = createRouter(_routes)
    }
  })

  app.use(webpackDevMiddleware(webpack(clientWebpackConfig), {
    publicPath: clientWebpackConfig.output.publicPath,
    serverSideRender: true,
    writeToDisk: true
  }))

  app.use(appConfig.publicPath, async (req, res) => {
    const asserts = res.locals.webpackStats.toJson().assetsByChunkName
    const route = serverRouter(req.path)
    console.log(asserts)

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
