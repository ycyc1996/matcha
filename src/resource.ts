import { ResourceController, MatchaConfig, Route } from './types'
import createRouter from './isomorphic/createRouter'
import path from 'path'

export class BaseResourceController implements ResourceController {
  matchaConfig: MatchaConfig
  instance: any = null
  constructor (matchaConfig: MatchaConfig) {
    this.matchaConfig = matchaConfig
  }

  loadInstance = (): void => {}

  getInstance = () => this.instance

  clearRequireCache = (requirePath: string): void => {
    try {
      delete require.cache[require.resolve(requirePath)]
      console.log(`delete cache success: ${requirePath}`)
    } catch (e) {
      console.log(e)
    }
  }
}

export class RouterController extends BaseResourceController {
  instance: ReturnType<typeof createRouter>
  constructor (matchaConfig: MatchaConfig) {
    super(matchaConfig)
    this.instance = createRouter([])
  }

  loadInstance = () => {
    this.instance = createRouter(this.getRoutes())
  }

  getRoutes = () => {
    const { root, out } = this.matchaConfig
    let routes: Route[] = []
    try {
      const entryPath = path.join(root, out, 'routes', 'index')
      this.clearRequireCache(entryPath)
      routes = require(entryPath).default
    } catch (e) {
      console.log(e)
    }
    return routes
  }
}

export class AssetsController extends BaseResourceController {
  instance: object
  constructor (matchaConfig: MatchaConfig) {
    super(matchaConfig)
    this.instance = {}
  }

  loadInstance = () => {
    this.instance = this.getAssetsManifest()
  }

  getAssetsManifest = () => {
    const { root, out } = this.matchaConfig
    const staticManifestPath = path.join(root, out, 'static', 'manifest')
    let assetsManifest = {}
    try {
      this.clearRequireCache(staticManifestPath)
      assetsManifest = require(staticManifestPath)
    } catch (e) {
      console.log(e)
    }
    return assetsManifest
  }
}
