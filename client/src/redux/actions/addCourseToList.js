import { ADD_COURSE, REMOVE_ALL_COURSES, EDIT_COURSE, REMOVE_COURSE } from './index'

export const addCourse = (num, major, course, credits) => dispatch => {
  const object = {
    id: num,
    major: major,
    course: course,
    credits: credits
  }
  dispatch({
    type: ADD_COURSE,
    payload: object
  })
}

export const removeAllCourses = () => dispatch => {
  let emptyArray = []
  dispatch({
    type: REMOVE_ALL_COURSES,
    payload: emptyArray
  })
}

export const editCourse = (array) => dispatch => {
  dispatch({
    type: EDIT_COURSE,
    payload: array
  })
}

export const removeCourse = (array) => dispatch => {
  dispatch({
    type: REMOVE_COURSE,
    payload: array
  })
}
