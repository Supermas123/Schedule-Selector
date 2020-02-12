import { FETCH_MAJORS, EMPTY_MAJORS } from '../actions'

const initialState = {
  majors: []
}

const majorReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MAJORS:
      return {
        ...state,
        majors: action.payload
      }
    case EMPTY_MAJORS:
      let empty = []
      return {
        ...state,
        majors: empty
      }

    default:
      return state
  }
}

export default majorReducer
