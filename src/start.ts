import express, { Express } from 'express'
import path from 'path'
import { AppConfig } from './types'
import webpack from 'webpack'
import webpackDevMiddleware  from 'webpack-dev-middleware'
import { createServerWebpackConfig, createClientWebpackConfig } from './webpack'
import createRouter from "../isomorphic/createRouter";

const NODE_ENV = process.env.NODE_ENV || 'development'

const getModuleAsync = async loader => {
  console.log(loader)
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


  let routes = []

  const clientWebpackConfig = createClientWebpackConfig(appConfig)

  const clientCompiler = webpack(clientWebpackConfig)
  app.use(webpackDevMiddleware(clientCompiler, {
    publicPath: clientWebpackConfig.output.publicPath,
    serverSideRender: true,
  }))


  let  serverRouter = createRouter([])

  const serverWebpackConfig = createServerWebpackConfig(appConfig)
  const serverCompiler = webpack(serverWebpackConfig, async (err, stats: webpack.Stats) => {
    console.log(err)
    console.log(stats.toString({ colors: true }))
    const { outputPath } = stats.toJson()

    if (outputPath) {
      const _routes = (await import(path.resolve(outputPath, 'main'))).default

      for (let i = 0; i < _routes.length; i++) {
        const module = await getModuleAsync(_routes[i].loader)
        console.log(module)
        _routes.loader = () => module
      }
      serverRouter = createRouter(_routes)
    }
  })



  app.use(appConfig.publicPath, async (req, res) => {
    const asserts = res.locals.webpackStats.toJson().assetsByChunkName
    const route = serverRouter(req.path)

    if (!route) {
      res.end(`404`)
      return
    }

    console.log(route)

    const appCtrlClass = await getModuleAsync(route.loader)
    const ctrl = new appCtrlClass()

    res.end(`
      <html>
        <head>
            <title>${ctrl.name}</title>
        </head>
        <body>
          <div id="mvc-app-container">${ctrl.name}</div>
           <script src="${clientWebpackConfig.output.publicPath}${asserts.vendor}"></script>
           <script src="${clientWebpackConfig.output.publicPath}${asserts.main}"></script>
        </body>
       </html>
      `)
  })

}


export default startApp
