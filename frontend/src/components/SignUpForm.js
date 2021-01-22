import React, { Component } from 'react';

export default class SignUpForm extends Component {
  render() {
    return (
      <form onSubmit={this.props.onCreateAccount}>
        <label htmlFor="firstName">First Name</label>
        <input required type="text" id="firstName" name="firstName" placeholder="first name" />
        <label htmlFor="lastName">Last Name</label>
        <input required type="text" id="lastName" name="lastName" placeholder="last name" />
        <label htmlFor="email">Email</label>
        <input required type="email" id="email" name="email" placeholder="email" />
        <label htmlFor="password">Password</label>
        <input required type="password" id="password" name="password" placeholder="password" />
        <button>Create Account</button>
      </form>
    );
  }
}
