import { FETCH_SCHOOLS, SELECT_SCHOOL } from '../actions'

const initialState = {
  schools: [],
  selectedSchool: ''
}

const schoolFetchReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SCHOOLS:
      return {
        ...state,
        schools: action.payload
      }

    case SELECT_SCHOOL:
      return {
        ...state,
        selectedSchool: action.selectedSchool
      }
        
    default:
      return state
  }
}

export default schoolFetchReducer
