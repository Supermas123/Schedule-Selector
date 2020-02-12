import React, { Component } from 'react';
import SchoolSelect from './SchoolSelect'
import TermSelect from './TermSelect'

class FirstRow extends Component {
  render() {
    return (
      <div className="row">
        <div className="col">
          <div id="first-row" className="selectRow">
            <SchoolSelect />
            <TermSelect />
          </div>
        </div>
      </div>
    );
  }
}
export default FirstRow
