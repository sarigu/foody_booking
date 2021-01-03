import React, { Component } from 'react';

export default class SignUpForm extends Component {
  render() {
    return (
      <form onSubmit={this.props.onCreateAccount}>
        <input type="text" name="username" placeholder="username" />
        <input type="email" name="email" placeholder="email" />
        <input type="password" name="password" placeholder="password" />
        <button>Create Account</button>
      </form>
    );
  }
}
