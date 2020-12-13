import AppController from 'matcha/isomorphic/controller'
import React from 'react'
import { actions, initialState } from './model'
import View from './view'

export default class extends AppController {
  name = 'home page!!!!!!!'
  ssr = true
  pageId = 10001
  View = View
  Model = { initialState, actions }

  beforeRender = async () => {
    this.store.getDispatchers().UPDATE_MESSAGES([
      'hello world!' + ' ----- 发布时间 ' + new Date(),
      'hi yichenyang!' + ' ----- 发布时间 ' + new Date(),
      'yo matcha!' + ' ----- 发布时间 ' + new Date()
    ])
  }


  submitForm = async () => {
    alert(JSON.stringify(this.store.getState().form))
  }
}
