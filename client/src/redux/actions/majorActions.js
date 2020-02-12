import { FETCH_MAJORS, EMPTY_MAJORS } from './index'
const axios = require('axios').default

export const fetchMajors= (school, term) => dispatch => {
  if(term !== ""){
    axios.post("/getMajors", {
      school: school,
      term: term
    })
    .then(res => res.data)
    .then(majors => dispatch({
      type: FETCH_MAJORS,
      payload: majors
    }))
  } else {
    dispatch({
      type: EMPTY_MAJORS
    })
  }
}
