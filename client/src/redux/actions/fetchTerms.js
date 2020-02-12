import { FETCH_TERMS, SELECT_TERM } from './index'
const axios = require('axios').default

export const fetchTerms = (school) => dispatch => {
  axios.post("/getTerms", {
    school: school
  })
  .then(res => res.data)
  .then(terms => dispatch({
    type: FETCH_TERMS,
    payload: terms
  }))
}

export const selectTerm = (term) => dispatch => {
  dispatch({
    type: SELECT_TERM,
    payload: '',
    selectedTerm: term
  });
}
