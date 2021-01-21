import React, { Component } from 'react';

export default class Logout extends Component {
  handleLogout = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:8000/auth/logout').then((response) => (response.status === 200 ? window.location = '/' : window.location = '/index'));
  }

  render() {
    return (
      <div>
        <div className="logoutBtn" onClick={this.handleLogout}>Logout</div>
      </div>
    );
  }
}
