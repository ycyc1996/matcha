import { RequestContext } from '../types'

export const getTimestamp = () => Number(new Date())

export const getUserAgent = (context: RequestContext) => {
  if (context.isServer) {
    return context?.req?.headers['user-agent'] ?? ''
  }

  if (window) {
    return window.navigator.userAgent
  }

  return ''
}
