const axios = require('axios').default

const fetchCredits = (school, term, major, course) => {
  return axios.post("/getCredits", {
    school: school,
    term: term,
    major: major,
    course: course
  }).then(res => res.data)
    .then(sections => {
      if(sections.length === 0){
        return -1
      } else {
        return sections[0].credits
      }
    })
}

export default fetchCredits
