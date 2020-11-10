import express, { Express } from 'express'
import { AppConfig } from './types'
import webpack from 'webpack'
import webpackDevMiddleware  from 'webpack-dev-middleware'
import { createClientWebpackConfig } from './webpack'

const NODE_ENV = process.env.NODE_ENV || 'development'


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

  const clientCompiler = webpack(clientWebpackConfig)
  app.use(webpackDevMiddleware(clientCompiler, {
    publicPath: clientWebpackConfig.output.publicPath,
    serverSideRender: true,
  }))


  app.use(appConfig.publicPath, async (req, res) => {
    const asserts = res.locals.webpackStats.toJson().assetsByChunkName

    res.end(`
      <html>
        <body>
          <div id="mvc-app-container">root</div>
         <script src="${clientWebpackConfig.output.publicPath}${asserts.vendor}"></script>
         <script src="${clientWebpackConfig.output.publicPath}${asserts.main}"></script>
        </body>
       </html>
      `)
  })

}


export default startApp
