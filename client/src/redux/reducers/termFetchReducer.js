import { FETCH_TERMS, SELECT_TERM } from '../actions'

const initialState = {
  terms: [],
  selectedTerm: ''
}

const termFetchReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TERMS:
      return {
        ...state,
        selectedTerm: '',
        terms: action.payload
      }

    case SELECT_TERM:
      return {
        ...state,
        selectedTerm: action.selectedTerm
      }

    default:
      return state
  }
}

export default termFetchReducer
