import { combineReducers } from 'redux'
import schoolFetchReducer from './schoolFetchReducer'
import termFetchReducer from './termFetchReducer'
import majorReducer from './majorReducer'
import listOfCoursesReducer from './listOfCoursesReducer'

export default combineReducers({
  school: schoolFetchReducer,
  term: termFetchReducer,
  major: majorReducer,
  list: listOfCoursesReducer
})
