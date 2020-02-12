import React, { Component } from 'react';
import './css/app.css'

class Header extends Component {
  render() {
    return (
      <div className="row">
        <div className="col">
          <div className="heading">
            <div className="display-4">Schedule Selector</div>
            <small className="lead">Select a school to begin</small>
          </div>
        </div>
      </div>
    );
  }
}
export default Header
