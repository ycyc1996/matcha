import { ModelAction, Store, Controller, RequestContext } from '../types'
import React from 'react'

export default abstract class AppController<ModelState> implements Controller<ModelState> {
  ssr: boolean = false
  pageId: number = 0
  store: Store<ModelState> | null = null
  context: RequestContext
  abstract View: React.FC<any>
  abstract Model: {
    initialState: ModelState;
    actions: {
      [key: string]: ModelAction<ModelState>
    }
  }

  constructor (context: RequestContext) {
    console.log('constructor')
    this.context = context
  }

  abstract beforeRender: () => Promise<void>

  abstract afterRender: () => Promise<void>

  abstract beforeUnMount: () => Promise<void>
}
