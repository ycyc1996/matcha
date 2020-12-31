import React, { useEffect, useState } from 'react'
import { Controller, ControllerFactory, RequestContext } from '../types'
import createStore from './createStore'

const createApp = async (AppCtrlClass: ControllerFactory<any>, context: RequestContext) => {
  const { isServer, prefetch, isClient } = context
  const ctrl: Controller<any> = new AppCtrlClass(context)

  const { View, Model } = ctrl

  const state = isClient && ctrl.ssr ? { ...prefetch.state } : { ...Model.initialState }
  ctrl.store = createStore(state, Model.actions)

  const AppView: React.FC<any> = () => {
    if (!ctrl.store) {
      return null
    }
    const [, setV] = useState(0)
    const { store } = ctrl
    const state = store.getState()
    const dispatchers = store.getDispatchers()

    useEffect(() => {
      const unsubscribe = store.subscribe(() => setV(v => v + 1))
      return () => unsubscribe()
    }, [])

    useEffect(() => {
      ctrl.afterRender?.()
    }, [])

    useEffect(() => {
      return () => {
        ctrl.beforeUnMount?.()
      }
    }, [])

    return (
      <div id="matcha-app-container">
        <View state={state} dispatchers={dispatchers} ctrl={ctrl}/>
      </div>
    )
  }

  if ((isServer && ctrl.ssr) || (!isServer && !ctrl.ssr)) {
    await ctrl.beforeRender?.()
  }

  // if (isServer) {
  //   context.prefetch.state = ctrl.store.getState()
  // }

  return {
    renderView: () => <AppView />,
    getCtrl: () => ctrl
  }
}

export default createApp
