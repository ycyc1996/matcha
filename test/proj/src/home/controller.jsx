import AppController from "../../../../src/isomorphic/controller"
import React from 'react'

export default class extends AppController {
  name = "home"

  view = () => {
    return (
      <div id="app-root">
        <h1>home page</h1>
      </div>
    )
  }

}
