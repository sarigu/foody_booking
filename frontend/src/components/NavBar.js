import React, { Component } from 'react';
import Logout from './Logout';

export default class Navbar extends Component {
  render() {
    return (
      <nav>
        <a href="http://localhost:3000/index"><div className="logo" /></a>
        <Logout />
      </nav>
    );
  }
}
