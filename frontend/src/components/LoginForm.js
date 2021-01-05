import React, { Component } from 'react';

export default class LoginForm extends Component {
  render() {
    return (
      <form onSubmit={this.props.onLogin}>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" placeholder="email" required />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" placeholder="password" required />
        <button>Login</button>
      </form>
    );
  }
}
