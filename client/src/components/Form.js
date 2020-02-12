import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FirstRow from './FirstRow'
import ClassSelectionRow from './ClassSelectionRow'
import { removeAllCourses, removeCourse } from '../redux/actions/addCourseToList'
import { addCourse } from '../redux/actions/addCourseToList';
import ListHeader from './ListHeader'
import { connect } from 'react-redux';

/*
{
  STRUCTURE OF STATE:
  loading: '',
  data: [],
  error: ''

  ACTIONS:
  FETCH_USERS_REQUEST
  FETCH_USERS_SUCCESS
  FETCH_USERS_FAILURE

  REDUCER:
  case FETCH_USERS_REQUEST:
    return {
      ...state,
      loading: true
    }
  case FETCH_USER_SUCCESS:
    return {
      ...state,
      loading: false,
      data: action.payload
    }
  case FETCH_USERS_FAILURE:
    return {
      ...state,
      loading: false,
      error: 'error message'
    }

}

*/

class Form extends Component {
  constructor(props){
    super(props)
    this.state = {
      compList: [],
      count: 0,
      disabled: false,
      minNumOfClasses: 0,
      maxNumOfClasses: 2,
      maxCredits: 0,
      currentCredits: 0
    }
  }

  componentDidMount = () => {
    if(this.props.term === ""){
      this.setState({ disabled: true })
    }
  }

  componentDidUpdate = (prevProps) =>{
     const newProps = this.props
     if((prevProps.term !== newProps.term) || (prevProps.school !== newProps.school)) {
        if(newProps.term === ""){
          this.setState({ disabled: true,
                          currentCredits: 0 }, this.getNumberOfCredits(newProps.school))
        } else {
          this.setState({ disabled: false })
        }

       let joined = [];
       this.props.removeAllCourses()
       this.setState({ compList: joined })
       if(this.state.minNumOfClasses !== 0){
         this.emptyNumClasses()
       }
     }
   }

  isAtMaxCredits = (addedCredits, removedCredits) => {
    let temp = this.state.maxCredits - (this.state.currentCredits - removedCredits)
    if(addedCredits === temp){
        this.setState({ disabled: true }, () => {
          this.setState((prevState) => ({ currentCredits : (prevState.currentCredits - removedCredits) + addedCredits }))
        })
        alert("AT MAX CREDIT LEVEL. CANNOT CHOOSE ANY MORE CLASSES")
        return true
      } else if(temp < addedCredits){
        alert("CLASS HAS TOO MANY CREDITS TO ADD. PLEASE CHOOSE ANOTHER CLASS!")
        return false
      } else if(temp > addedCredits){
        this.setState((prevState) => ({ currentCredits : (prevState.currentCredits - removedCredits) + addedCredits  }))
        this.setState({ disabled : false })
        return true
      }

  }

  getNumberOfCredits = (school) => {
     if(school === "uga"){
       this.setState({ maxCredits : 20 })
     } else if (school === "emory") {
       this.setState({ maxCredits : 22 })
     } else if(school === "gatech"){
       this.setState({ maxCredits : 21 })
     } else if(school === "neu"){
       this.setState({ maxCredits : 21 })
     } else if(school === "umd"){
       this.setState({ maxCredits : 20 })
     }
  }

  addNumClasses = () => {
    this.setState((prevState) => ({
      minNumOfClasses: prevState.minNumOfClasses + 1
    }))
  }

  removeNumClasses = () => {
    if(this.state.minNumOfClasses !== 0){
      this.setState((prevState) => ({
        minNumOfClasses: prevState.minNumOfClasses - 1
      }))
    }
  }

  emptyNumClasses = () => {
   this.setState({
     minNumOfClasses: 0
   })}

  addComponentOnClick = (e) => {
    if(this.state.compList.length < 8){
      if(this.state.minNumOfClasses >= 2){
        this.setState((prevState) => ({
          maxNumOfClasses: prevState.maxNumOfClasses + 1
        }))
      }
      this.setState((prevState) => ({
        count: prevState.count + 1
      }), () => {
        this.setState((prevState2) => ({
          compList: [...prevState2.compList, <ClassSelectionRow key={this.state.count} num={this.state.count} callback={this.deleteComponentCallBack} addClass={this.addNumClasses} removeClass={this.removeNumClasses} emptyClass={this.emptyNumClasses} changeCredits={this.isAtMaxCredits}/>]
        }), () => {
          if(this.state.compList.length === 8){
             this.setState({ disabled: true })
          }
          this.props.addCourse(this.state.count, "", "", 0);
        })
      })
    }
  }

  deleteComponentCallBack = (numberToDelete) => {
    let i;
    let k;
    let { compList } = this.state
    let copyList2 = Object.values(compList)
    let stateCopyList = this.props.courseList

    if(this.state.maxNumOfClasses > 2){
      this.setState((prevState) => ({
        maxNumOfClasses: prevState.maxNumOfClasses - 1
      }))
    }


    for(i = 0; i < copyList2.length; i++){
      if(copyList2[i].key == numberToDelete){
          copyList2.splice(i, 1)
          break;
        }
      }

    for(k = 0; k < stateCopyList.length; k++){
      if(stateCopyList[k].id === numberToDelete){
          this.isAtMaxCredits(0, stateCopyList[k].credits)
          stateCopyList.splice(k, 1)
          break;
        }
      }

    this.props.removeCourse(stateCopyList)
    this.setState({
      compList: copyList2,
      disabled: false
    })

    if(this.state.maxNumOfClasses === this.state.minNumOfClasses){
      this.removeNumClasses()
    }
  }

  validateForm = (e) => {
    e.preventDefault()
    alert("submit clicked")
  }

  render(){

    let isDisabled = {
      disabled: true
    }
    if(this.state.minNumOfClasses >= this.state.maxNumOfClasses){
      isDisabled.disabled = false;
    }

    return (
      <React.Fragment>
        <FirstRow />
        <ListHeader />
        { this.state.compList }
        <div id="buttonContainer">
          <button id="addButton" type="button" className="btn btn-primary" onClick={this.addComponentOnClick} disabled={this.state.disabled}>Add a Class</button>
        </div>
        <div id="buttonContainer">
          <button id="submitButton" type="submit" className="btn btn-outline-success" onClick={this.validateForm} disabled={isDisabled.disabled}>CALCULATE YOUR SCHEDULE</button>
        </div>
      </React.Fragment>
    );
  }
}

Form.propTypes = {
  school: PropTypes.string,
  term: PropTypes.string,
  removeAllCourses: PropTypes.func.isRequired,
  courseList: PropTypes.array,
  removeCourse: PropTypes.func.isRequired,
  addCourse: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  school: state.school.selectedSchool,
  term: state.term.selectedTerm,
  courseList: state.list.listOfCourses
});

export default connect(mapStateToProps, { removeAllCourses, removeCourse, addCourse })(Form);
