import { ADD_COURSE, REMOVE_ALL_COURSES, EDIT_COURSE, REMOVE_COURSE } from '../actions'

const initialState = {
  listOfCourses: [],
}

const listOfCoursesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_COURSE:
      return {
        ...state,
        listOfCourses: state.listOfCourses.concat(action.payload)
      }

    case REMOVE_ALL_COURSES:
      return {
        ...state,
        listOfCourses: action.payload
      }

    case EDIT_COURSE:
      return {
        ...state,
        listOfCourses: action.payload
      }

    case REMOVE_COURSE:
      return {
        ...state,
        listOfCourses: action.payload
      }

    default:
      return state
  }
}

export default listOfCoursesReducer
