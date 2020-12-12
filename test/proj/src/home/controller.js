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

  afterRender = async () => {
    setTimeout(() => {
      this.store.getDispatchers().UPDATE_MESSAGES([
        'hello world!' + '  —— ' + new Date(),
        'hi yichenyang!' + '  —— ' + new Date(),
        'yo matcha!' + '  —— ' + new Date()
      ])
    }, 1000)
  }


  submitForm = async () => {
    alert(JSON.stringify(this.store.getState().form))
  }
}
