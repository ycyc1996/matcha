import React from 'react'

const View = ({ state, dispatchers, ctrl }) => {

  console.log(ctrl)

  const onNameChange = (e) => dispatchers.UPDATE_FORM_DATA({ name: e.target.value })

  const onAgeChange = (e) => dispatchers.UPDATE_FORM_DATA({ age: e.target.value })

  return (
    <div id="app-root">
      <h1>我的主页</h1>
      <h2>count: { state.count }</h2>
      <div onClick={() => {
        console.log('click')
        dispatchers.INCREMENT_COUNT()
      }}>click me!!!!</div>
      <br/>
      <Messages messages={state.messages}/>
      <br/>
      <input type="text" value={state.form.name} onChange={onNameChange}/>
      <br/>
      <input type="text" value={state.form.age} onChange={onAgeChange}/>
      <br/>
      <button onClick={ctrl.submitForm}>submit</button>
    </div>
  )
}

const Messages = ({ messages = [] }) => {
  return (
    <ul>
      {messages.map(message => <li key={message}>{message}</li>)}
    </ul>
  )
}

export default View