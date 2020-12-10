import AppController from '../../../../src/isomorphic/controller'
import React from 'react'
import { actions, initialState } from './model'

export default class extends AppController {
  name = 'home page!!!!!!!'
  ssr = true
  pageId = 10001

  View = ({ state, dispatchers, ctrl }) => {
    console.log(state, dispatchers, ctrl)

    const submit = () => {
      alert(JSON.stringify(state.form))
    }

    const onNameChange = (e) => dispatchers.UPDATE_FORM_DATA({ name: e.target.value })
    const onAgeChange = (e) => dispatchers.UPDATE_FORM_DATA({ age: e.target.value })
    return (
      <div id="app-root">
        <h1>my home</h1>
        <h2>count: { state.count }</h2>
        <div onClick={() => {
          console.log('click')
          dispatchers.INCREMENT_COUNT()
        }}>click me!!!!</div>
        <br/>
        <input type="text" value={state.form.name} onChange={onNameChange}/>
        <br/>
        <input type="text" value={state.form.age} onChange={onAgeChange}/>
        <br/>
        <button onClick={submit}>submit</button>
      </div>
    )
  }

  Model = {
    initialState,
    actions
  }


}
