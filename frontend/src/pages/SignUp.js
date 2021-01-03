import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SignUpForm from '../components/SignUpForm';

export default class SignUp extends Component {
    handleSignUp = async (e) => {
      e.preventDefault();
      const { username, email, password } = e.target;

      await fetch('http://localhost:8000/auth/signup', {
        method: 'POST',
        body: JSON.stringify({
          username: username.value,
          email: email.value,
          password: password.value,
        }),
        headers: { 'Content-Type': 'application/json' },
      }).then((response) => (response.status === 200 ? window.location = '/' : window.location = '/signup'));
    }

    render() {
      return (
        <div>
          <h1>Sign Up</h1>
          <SignUpForm onCreateAccount={this.handleSignUp} />
          <Link to="/">Already have an account? Log in</Link>
        </div>
      );
    }
}
