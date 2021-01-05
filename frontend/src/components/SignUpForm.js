import React, { Component } from 'react';

export default class SignUpForm extends Component {
  render() {
    return (
      <form onSubmit={this.props.onCreateAccount}>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" name="username" placeholder="username" />
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" placeholder="email" />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" placeholder="password" />
        <button>Create Account</button>
      </form>
    );
  }
}
