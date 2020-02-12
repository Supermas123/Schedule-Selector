import { FETCH_SCHOOLS, SELECT_SCHOOL } from './index'
const axios = require('axios').default

export const fetchSchools = () => dispatch => {
  axios.get("/getSchools")
  .then(res => res.data)
  .then(schools => dispatch({
    type: FETCH_SCHOOLS,
    payload: schools,
    selectedSchool: ''
  }));
}

export const selectSchool = (school) => dispatch => {
  dispatch({
    type: SELECT_SCHOOL,
    payload: '',
    selectedSchool: school
  });
}
