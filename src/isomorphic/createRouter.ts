import { Route } from '../types'

const createRouter = (routes: Route[]) => {
  return (path: string) => {
    return routes.find(route => {
      return route.patterns.some(parttern => path.endsWith(parttern))
    }) || null
  }
}

export default createRouter
