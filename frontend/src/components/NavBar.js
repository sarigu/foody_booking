import React, { Component } from 'react';
import Logout from './Logout.js';

export default class Navbar extends Component {
  render() {
    return (
      <nav>
        <div className="logo" />
        <Logout />
      </nav>
    );
  }
}
