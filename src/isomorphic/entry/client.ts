// @ts-ignore
import routes from '@routes'
import createRouter from '../createRouter'
import createApp from '../createApp'
import ReactDom from 'react-dom'

console.log(routes)

const getModuleAsync = async loader => {
  return (await loader()).default
}

const start = async () => {
  const clientRouter = createRouter(routes)
  const pathname = window.location.pathname
  const route = clientRouter(pathname)

  console.log(route)
  if (route) {
    console.log(route)
    const AppCtrlClass = await getModuleAsync(route.loader)

    // @ts-ignore
    const initialState = window.__InitialState__ || null

    const app = await createApp(AppCtrlClass, {
      isServer: false,
      isClient: true,
      location: { ...location },
      initialState
    })

    console.log(app.getCtrl())

    if (app.getCtrl().ssr) {
      ReactDom.hydrate(app.renderView(), document.getElementById('matcha-app-root'))
    } else {
      ReactDom.render(app.renderView(), document.getElementById('matcha-app-root'))
    }
  }
}

start()
