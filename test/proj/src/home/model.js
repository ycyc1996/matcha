export const initialState = {
  count: 0
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
  }
}
