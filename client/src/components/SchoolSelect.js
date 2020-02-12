import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { fetchSchools, selectSchool } from '../redux/actions/fetchSchools'
import Select from 'react-select';

class SchoolSelect extends Component {

  constructor(props){
     super(props)
     this.state = {
       selected: '',
       valueOfTerm: ""
     }
   }

  componentDidMount = () => {
    this.props.fetchSchools()
  }

  onChange = (selectedOption) => {
    this.setState({ selected : selectedOption.value,
                    valueOfTerm: selectedOption   })
    this.props.selectSchool(selectedOption.value)
  }

  render() {

    /*
    <select name="selected" className="form-control" id="selectSchools" onChange={this.onChange}>
      <option value="select" disabled selected>Select your school</option>
      { schools }
    </select>
    */
    const schools = this.props.schools.map(school => (
      { value: school.ident, label: school.name }
    ))
    return (
      <div className="form-group selectBox" id="schoolSelectBox">
        <label htmlFor="selectSchools">Select a School</label>
        <Select id="selectSchools" onChange={this.onChange} value={this.state.valueOfTerm} placeholder="Select a school" options={schools}/>

      </div>
    );
  }
}

SchoolSelect.propTypes = {
  fetchSchools: PropTypes.func.isRequired,
  selectSchool: PropTypes.func.isRequired,
  schools: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
  schools: state.school.schools
});


export default connect(mapStateToProps, { fetchSchools, selectSchool })(SchoolSelect);
