import AppController from "matcha/isomorphic/controller"
import React from 'react'

export default class extends AppController {
  name = "test"

  view = () => {
    return (
      <div id="app-root">
        <h1>test page</h1>
      </div>
    )
  }
}
