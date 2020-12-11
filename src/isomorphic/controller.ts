import { ModelAction, Store, Controller } from '../types'
import React from 'react'

export default abstract class AppController<ModelState> implements Controller<ModelState> {
  ssr: boolean = false
  pageId: number = 0
  store: Store<ModelState> | null = null

  abstract View: React.FC<any>
  abstract Model: {
    initialState: ModelState;
    actions: {
      [key: string]: ModelAction<ModelState>
    }
  }

  constructor (context) {
    console.log('constructor')
    console.log(context)
  }

  abstract beforeRender: () => Promise<void>

  abstract afterRender: () => Promise<void>

  abstract beforeUnMount: () => Promise<void>
}
