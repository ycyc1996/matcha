// @ts-ignore
import routes from '@routes'
import createRouter from '../createRouter'

console.log(routes)

const getModuleAsync = async loader => {
  return (await loader()).default
}

const start = async () => {
  const clientRouter = createRouter(routes)

  const pathname = window.location.pathname

  const route = clientRouter(pathname)

  if (route) {
    console.log(route)
    const AppCtrlClass = await getModuleAsync(route.loader)

    const ctrl = new AppCtrlClass()

    console.log(ctrl.name)
  }
}

start()
