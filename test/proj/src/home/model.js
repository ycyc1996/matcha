export const initialState = {
  count: 0,
  form: {
    name: '',
    age: '',
  },
  messages: []
}

export const actions = {

  INCREMENT_COUNT: (state) => {
    return {
      ...state,
      count: state.count + 1,
    }
  },


  RESET_COUNT: (state) => {
    return {
      ...state,
      count:  0
    }
  },

  UPDATE_FORM_DATA: (state, payload) => {
    return {
      ...state,
      form: {
        ...state.form,
        ...payload,
      }
    }
  },

  UPDATE_MESSAGES: (state, payload) => {
    return {
      ...state,
      messages: [...payload]
    }
  }
}
