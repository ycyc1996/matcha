import { Route } from '../types'

const createRouter = (routes: Route[], load = false) => {
  return (path: string) => {
    return routes.find(route => {
      console.log(route.patterns, path)
      return route.patterns.some(parttern => path.endsWith(path))
    }) || null
  }
}

export default createRouter
