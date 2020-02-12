import React, { Component } from 'react';
import './css/app.css'

class ListHeader extends Component {
  render() {
    return (
      <div className="row">
        <div className="col">
          <div className="heading">
            <div className="display-4" id="class-header">Class List</div>
            <small className="lead" id="class-heading-descrip">Click button to add more classes</small>
          </div>
        </div>
      </div>
    );
  }
}
export default ListHeader
