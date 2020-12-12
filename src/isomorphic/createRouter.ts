import { Route } from '../types'

const createRouter = (routes: Route[]) => {
  console.log(routes)
  return (path: string) => {
    return routes.find(route => {
      console.log(route.patterns, path)
      return route.patterns.some(parttern => parttern.endsWith(path))
    }) || null
  }
}

export default createRouter
