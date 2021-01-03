import React, { Component } from 'react';
import Logout from './Logout';

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
