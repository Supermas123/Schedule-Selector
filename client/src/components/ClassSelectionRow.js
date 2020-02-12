import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MajorSelect from './MajorSelect'

 class ClassSelectionRow extends Component {

   onClick = (e) => {
     e.preventDefault()
     this.props.callback(this.props.num)
   }

  render() {

    return (
      <div className="row">
        <div className="col">
          <div className="selectRow class-selection-row">
            <MajorSelect num={this.props.num} addClass={this.props.addClass} removeClass={this.props.removeClass} emptyClass={this.props.emptyClass} changeCredits={this.props.changeCredits}/>
              <button type="button" className="close deleteRowButton" data-dismiss="alert" aria-label="Close" onClick={this.onClick}>
                <span aria-hidden="true">&times;</span>
              </button>
          </div>
        </div>
      </div>
    );
  }
}

ClassSelectionRow.propTypes = {
  num: PropTypes.number
}

const mapStateToProps = (state) => ({

});

export default connect(mapStateToProps, {})(ClassSelectionRow);
