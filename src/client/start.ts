// @ts-ignore
import routes from '@routes'
import createRouter from '../isomorphic/createRouter'
import createApp from '../isomorphic/createApp'
import ReactDom from 'react-dom'

const getModuleAsync = async loader => {
  return (await loader()).default
}

const start = async () => {
  const clientRouter = createRouter(routes)
  // @ts-ignore
  const prefetch = JSON.parse(decodeURIComponent(window.__PREFETCH__ || '{}'))
  // @ts-ignore
  const location = JSON.parse(decodeURIComponent(window.__LOCATION__ || '{}'))

  const route = clientRouter(location?.path)

  if (route) {
    const AppCtrlClass = await getModuleAsync(route.loader)
    const app = await createApp(AppCtrlClass, {
      isServer: false,
      isClient: true,
      location: { ...location },
      prefetch: { ...prefetch }
    })

    if (app.getCtrl().ssr) {
      ReactDom.hydrate(app.renderView(), document.getElementById('matcha-app-root'))
    } else {
      ReactDom.render(app.renderView(), document.getElementById('matcha-app-root'))
    }
  }
}

start()
