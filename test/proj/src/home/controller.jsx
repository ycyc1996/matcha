import AppController from '../../../../src/isomorphic/controller'
import React from 'react'
import { actions, initialState } from './model'

export default class extends AppController {
  name = 'home page!!!!!!!'
  ssr = true
  pageId = 10001

  View = ({ state, dispatchers, ctrl }) => {
    console.log(state, dispatchers, ctrl)
    return (
      <div id="app-root">
        <h1>my home</h1>
        <h2>count: { state.count }</h2>
        <div onClick={() => {
          console.log('click')
          dispatchers.INCREMENT_COUNT()
        }}>click me!!!!</div>
      </div>
    )
  }

  Model = {
    initialState,
    actions
  }


}
