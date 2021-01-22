import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SignUpForm from '../components/SignUpForm';

export default class SignUp extends Component {
  handleSignUp = async (e) => {
    e.preventDefault();
    const {
      email, password, firstName, lastName,
    } = e.target;

    await fetch('http://localhost:8000/auth/signup', {
      method: 'POST',
      body: JSON.stringify({
        email: email.value,
        password: password.value,
        firstName: firstName.value,
        lastName: lastName.value,
      }),
      headers: { 'Content-Type': 'application/json' },
    }).then((response) => (response.status === 200 ? window.location = '/' : window.location = '/signup'));
  }

  render() {
    return (
      <div>
        <div className="main">
          <h1>Sign Up to F&#127833;&#127833;dy </h1>
          <SignUpForm onCreateAccount={this.handleSignUp} />
          <Link className="link-elem" to="/">Already have an account? Log in</Link>
        </div>
      </div>
    );
  }
}
