import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CourseSelect from './CourseSelect'
import { fetchMajors } from '../redux/actions/majorActions';
import { connect } from 'react-redux';
import Select from 'react-select';


class MajorSelect extends Component {

   constructor(props){
     super(props)
     this.state = {
       selected: '',
       valueOfTerm: "",
     }
   }

 componentDidUpdate = (prevProps) => {
    const newProps = this.props
    if((prevProps.term !== newProps.term) || (prevProps.school !== newProps.school)) {
      this.props.fetchMajors(newProps.school, newProps.term)
      this.setState({ selected: '' })
      this.setState({ valueOfTerm: "select" })

    }
  }

  onChange = (selectedOption) => {
    console.log(selectedOption)
    this.setState({ selected : selectedOption.value,
                  valueOfTerm: selectedOption })
  }

  render() {

    /*<option key={major.ident} value={major.ident}>{major.name}</option>
    <select name="selected" className="form-control" id="selectMajors" onChange={this.onChange} value={this.state.valueOfTerm}>
      <option value="select" disabled selected>Select a major</option>
      { majors }
    </select>

    majors.unshift({ value: "select", label: "Select a major"})
    */

    let majors = []
    if(this.props.majors.length !== 0){
      majors = this.props.majors.map(major => {
      return(
        { value: major.ident, label: major.name }
       )
      })
    }

    return (
        <React.Fragment>
          <div className="form-group selectBox majorSelectBox">
            <label htmlFor="selectMajors">Select a Major</label>
            <Select id="selectMajors" onChange={this.onChange} value={this.state.valueOfTerm} placeholder="Select a major" options={majors}/>
          </div>
          <CourseSelect major={ this.state.selected } num={this.props.num} addClass={this.props.addClass} removeClass={this.props.removeClass} emptyClass={this.props.emptyClass} changeCredits={this.props.changeCredits}/>
        </React.Fragment>
    );
  }
}

MajorSelect.propTypes = {
  fetchMajors: PropTypes.func.isRequired,
  school: PropTypes.string,
  term: PropTypes.number,
  majors: PropTypes.array.isRequired,
  num: PropTypes.number
}

const mapStateToProps = (state) => ({
  school: state.school.selectedSchool,
  term: state.term.selectedTerm,
  majors: state.major.majors
});

export default connect(mapStateToProps, { fetchMajors })(MajorSelect);
