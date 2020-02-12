const axios = require('axios').default

const fetchCourses = (school, term, major) => {
  var emptyArr = []
  if(major !== ""){
     return axios.post("/getCourses", {
      school: school,
      term: term,
      major: major
    }).then(res => {
      return res.data
    })
  } else {
    return emptyArr
  }
}

export default fetchCourses
