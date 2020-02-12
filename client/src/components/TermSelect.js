import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { fetchTerms, selectTerm } from '../redux/actions/fetchTerms'
import { fetchMajors } from '../redux/actions/majorActions'
import Select from 'react-select';

class TermSelect extends Component {

  constructor(props){
    super(props)
    this.state = {
      selected: '',
      valueOfTerm: "",
      isDisabled: true
    }
  }

  componentDidUpdate = (prevProps) => {
     const newProps = this.props
     if(prevProps.school !== newProps.school) {
       this.props.fetchTerms(newProps.school)
       this.props.fetchMajors(newProps.school, newProps.term)
       this.setState({ selected: '' })
       this.setState({ valueOfTerm: "select" })
       if(newProps.school === ""){
         this.setState({ isDisabled: true })
       } else {
         this.setState({ isDisabled: false })
       }

     } else if(prevProps.term !== newProps.term){
       this.props.fetchMajors(newProps.school, newProps.term)
     }
   }

   onChange = (selectedOption) => {
     this.setState({ selected : selectedOption.value })
     this.props.selectTerm(selectedOption.value)
     this.setState({ valueOfTerm: selectedOption })
   }


  render() {

    /*
    <select name="selected" className="form-control" id="selectTerms" onChange={this.onChange} value={this.state.valueOfTerm}>
      <option value="select" disabled selected>Select a term</option>
      { terms }
    </select>
    */

    let terms = []
    if(this.props.terms.length !== 0){
      terms = this.props.terms.map(term => {
        let name = term.semester + " " + term.ident.toString().substring(0,4)
        return(
          { value: term.ident, label: name }
        )
      })
    }

    return (
        <div className="form-group selectBox" id="termSelectBox">
          <label htmlFor="selectTerms">Select a Term</label>
          <Select onChange={this.onChange} value={this.state.valueOfTerm} placeholder="Select a term" options={terms} isDisabled={this.state.isDisabled}/>
        </div>
    );
  }
}

TermSelect.propTypes = {
  fetchTerms: PropTypes.func.isRequired,
  selectTerm: PropTypes.func.isRequired,
  school: PropTypes.string,
  terms: PropTypes.array,
  term: PropTypes.string,
  fetchMajors: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  terms: state.term.terms,
  school: state.school.selectedSchool,
  term: state.term.selectedTerm
});

export default connect(mapStateToProps, { fetchTerms, selectTerm, fetchMajors })(TermSelect);
