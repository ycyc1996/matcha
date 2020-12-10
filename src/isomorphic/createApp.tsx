import React, { useEffect, useState } from 'react'
import { Controller, ControllerFactory } from '../types'
import createStore from './createStore'

const createApp = async (AppCtrlClass: ControllerFactory<any>, {
  isServer, initialState, isClient, location
}) => {
  const ctrl: Controller<any> = new AppCtrlClass({})

  const { View, Model } = ctrl

  ctrl.store = createStore({
    ...Model.initialState,
    ...(ctrl.ssr ? { ...initialState } : {})
  }, Model.actions)

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
      ctrl.afterRender()
    }, [])

    useEffect(() => {
      return () => ctrl.beforeUnMount()
    }, [])

    return (
      <div id="matcha-app-container">
        <View state={state} dispatchers={dispatchers} ctrl={ctrl}/>
      </div>
    )
  }

  if ((isServer && ctrl.ssr) || (!isServer && !ctrl.ssr)) {
    await ctrl.beforeRender()
  }

  return {
    renderView: () => <AppView/>,
    getCtrl: () => ctrl
  }
}

export default createApp
