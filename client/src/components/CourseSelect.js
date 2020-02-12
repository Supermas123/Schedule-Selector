import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import fetchCourses from '../redux/actions/courseActions';
import { addCourse, editCourse } from '../redux/actions/addCourseToList';
import fetchCredits from '../redux/actions/creditAction';
import Select from 'react-select';

 class CourseSelect extends Component {

  constructor(props){
     super(props)
     this.state = {
       selected: '',
       courses: [],
       valueOfTerm: "",
       courseCredits: 0,
       isDisabled: true
     }

     this.onChange = this.onChange.bind(this)

   }

  componentDidUpdate = async (prevProps) => {
      const newProps = this.props
      if((prevProps.major !== newProps.major) || (prevProps.term !== newProps.term) || (prevProps.school !== newProps.school)) {
        if((prevProps.major !== newProps.major) && newProps.major !== "" && this.state.selected !== ''){
          let copy = this.props.list
          let editedArray = this.editArray(copy, this.props.num, "", 0)
          this.props.editCourse(editedArray)
          this.props.removeClass()
          this.props.changeCredits(0, this.state.courseCredits)
        }
        this.setState({ valueOfTerm: "select",
                        isDisabled: false })
        let data = await fetchCourses(newProps.school, newProps.term, newProps.major)
        this.setState({ courses: data,
                        selected: '',
                        courseCredits: 0})

      }
    }

  editArray = (arr, number, value, credit) => {
      let arr2 = [{
        id: number,
        major: this.props.major,
        course: value,
        credits: credit
      }]

      let changedArray = arr.map(obj => arr2.find(o => o.id === obj.id) || obj);
      console.log(changedArray)
      return changedArray;
    }

  checkIfInArray = (arr, number, value, credits) => {
      const found = arr.some(el => el.id === number);
      if (!found){
        return true
      } else {
        let changedArray = this.editArray(arr, number, value, credits)
        return changedArray
      }
    }

  checkIfClassSelected = (major, courseNumber) => {
    let isValid = true
    let temp = courseNumber
    let temp2 = null;

    let indexOfH1 = courseNumber.indexOf("H")
    let indexOfH2 = -1

    let courses = this.props.list

    if(indexOfH1 !== -1){
      temp = temp.substring(0, indexOfH1)
    }

    for(let i = 0; i < courses.length; i++){
       temp2 = courses[i].course
       indexOfH2 = temp2.indexOf("H")
       if(indexOfH2 !== -1){
         temp2 = temp2.substring(0, indexOfH2)
       }
       if(temp === temp2 && major === courses[i].major){
         isValid = false
         break
       }
    }

    if(!isValid){
      if((indexOfH1 !== -1 && indexOfH2 === -1) || (indexOfH1 === -1 && indexOfH2 !== -1)){
        alert("YOU CANNOT BE ENROLLED IN BOTH THE REGULAR AND HONORS VERSION OF A CLASS. PLEASE CHANGE!")
      } else {
        alert("YOU CANNOT ADD TWO OF THE SAME CLASS! PLEASE CHANGE!")
      }
    }
    return isValid
  }

  async onChange(selectedOption){
      let copyArray = this.props.list
      let courseNumber = selectedOption.value
      //let selectedVar = selectedOption.label
      let numCredits = await fetchCredits(this.props.school, this.props.term, this.props.major, courseNumber)
      if(numCredits !== -1){
        let isValid = this.checkIfClassSelected(this.props.major, courseNumber)
        if(isValid){
          let newArray = this.checkIfInArray(copyArray, this.props.num, courseNumber, numCredits)
          let canAdd;
          if(typeof newArray === 'boolean'){
            //canAdd = this.props.changeCredits(numCredits, 0)
            canAdd = this.props.changeCredits(numCredits, this.state.courseCredits)
            if(canAdd){
              //this.props.addCourse(this.props.num, this.props.major, courseNumber, numCredits)
              this.props.editCourse(newArray)
              this.setState({ selected : courseNumber })
              this.setState({ valueOfTerm: selectedOption,
                              courseCredits: numCredits })
              this.props.addClass()
            }
          } else {
            canAdd = this.props.changeCredits(numCredits, this.state.courseCredits)
            if(canAdd){
              this.props.editCourse(newArray)
              this.setState({ selected : courseNumber})
              this.setState({ valueOfTerm: selectedOption,
                              courseCredits: numCredits })
              this.props.addClass()
            }
          }
        }
      } else {
        alert("NO SECTIONS AVAILABLE FOR THAT COURSE! PLEASE CHOOSE ANOTHER")
      }



    }

  render() {

    let courses = []
    if(this.state.courses.length !== 0){
      courses = this.state.courses.map(course => {
      let name = this.props.major + " " + course.ident + " (" + course.name + ")"
      return(
        { value: course.ident, label: name }
       )
      })
    }

    return (
      <div className="form-group selectBox courseSelectBox">
        <label htmlFor="selectCourses">Select a Course</label>
        <Select id="selectCourses" onChange={this.onChange} value={this.state.valueOfTerm} placeholder="Select a course" options={courses} isDisabled={this.state.isDisabled}/>
      </div>
    );
  }
}

CourseSelect.propTypes = {
  school: PropTypes.string,
  term: PropTypes.number,
  major: PropTypes.string,
  num: PropTypes.number,
  addCourse: PropTypes.func.isRequired,
  list: PropTypes.array,
  editCourse: PropTypes.func.isRequired,
  fetchCredits: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  school: state.school.selectedSchool,
  term: state.term.selectedTerm,
  list: state.list.listOfCourses
});


export default connect(mapStateToProps, { addCourse, editCourse, fetchCredits })(CourseSelect);
