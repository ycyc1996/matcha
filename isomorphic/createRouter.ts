import {  Route } from '../src/types'

const createRouter = (entries: Route[], load = false) => {
  return (path: string) => {
    console.log(entries)
    return entries.find(entry => {
      return entry.patterns.some(parttern => path.endsWith(parttern))
    }) || null
  }
}

export default createRouter
