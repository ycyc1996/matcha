import express, { Express } from 'express'
import path from 'path'
import { MatchaConfig, ControllerFactory, RequestContext } from './types'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import { createServerWebpackConfig, createClientWebpackConfig } from './webpack'
import createApp from './isomorphic/createApp'
import { renderToString } from 'react-dom/server'
import { RouterController, AssetsController } from './resource'
import process from 'process'

process.on('exit', (code) => {
  console.log(`退出码: ${code}`)
})

const getModuleAsync = async loader => {
  return (await loader()).default
}

const getDevAssets = (assetsByChunkName: object): Record<string, string> => {
  return Object.keys(assetsByChunkName).reduce<Record<string, string>>((assets: Record<string, string>, chunkName: string) => {
    return {
      ...assets,
      [chunkName]: Array.isArray(assetsByChunkName[chunkName]) ? assetsByChunkName[chunkName][0] : assetsByChunkName[chunkName]
    }
  }, {})
}

const startApp = (matchaConfig: MatchaConfig) => {
  const startMatchaConfig = {
    ...matchaConfig,
    out: matchaConfig.temp
  }
  const { port, mode, root, src, publicPath, staticPath, out } = startMatchaConfig

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
         -- isProd: ${isProd}
    app:
         -- publicPath: ${publicPath}
         -- staticPath: ${staticPath}
         -- assets: assets
  `)
  })

  const routerCtrl = new RouterController(startMatchaConfig)
  const assetsCtrl = new AssetsController(startMatchaConfig)

  if (isDev) {
    webpack(createServerWebpackConfig(startMatchaConfig, true), async (err, stats: webpack.Stats) => {
      console.log(err)
      console.log(stats.toString({ colors: true }))
      routerCtrl.loadInstance()
    })
  } else {
    routerCtrl.loadInstance()
  }

  if (isDev) {
    const staticDevMiddleware = webpackDevMiddleware(webpack(createClientWebpackConfig(startMatchaConfig, true)), {
      publicPath: staticPath,
      serverSideRender: true,
      writeToDisk: true
    })
    app.use(staticDevMiddleware)
  } else {
    assetsCtrl.loadInstance()
    app.use(staticPath, express.static(path.join(root, out, 'static')))
  }

  app.use(publicPath, async (req, res) => {
    const assets = isDev ? getDevAssets(res.locals.webpackStats.toJson().assetsByChunkName) : assetsCtrl.getInstance()

    console.log(assets)
    const serverRouter = routerCtrl.getInstance()
    const route = serverRouter(req.path)

    if (!route) {
      res.end('404')
      return
    }

    const AppCtrlClass = await getModuleAsync(route.loader)

    const context: RequestContext = {
      isServer: true,
      isClient: false,
      location: {
        protocol: req.protocol,
        hostname: req.hostname,
        baseUrl: req.baseUrl,
        path: req.path,
        query: req.query
      },
      prefetch: { state: {} },
      req
    }

    const app = await createApp(AppCtrlClass as ControllerFactory<any>, context)
    const ctrl = app.getCtrl()
    context.prefetch.state = ctrl.store?.getState() || {}
    const content = ctrl.ssr ? renderToString(app.renderView()) : ''
    const main = assets.main
    const vendor = assets.vendor
    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
    res.end(`
      <html>
        <head>
            <title>matcha</title>
        </head>
         <script>
            window.__LOCATION__ = '${encodeURIComponent(JSON.stringify(context.location))}'
            window.__PREFETCH__ = '${encodeURIComponent(JSON.stringify(context.prefetch))}'       
            window.__XSS__ = '${encodeURIComponent('alert(123)')}'
          </script>
        <body>
          <div id="matcha-app-root">${content}</div>
           <script src="${staticPath}${main}"></script>
           <script src="${staticPath}${vendor}"></script>
        </body>
       </html>
      `)
  })
}

export default startApp
