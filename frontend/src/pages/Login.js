import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../components/LoginForm';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {};
  }

  handleLogin = (e) => {
    e.preventDefault();
    const { email, password } = e.target;
    const user = { email: email.value, password: password.value };

    fetch('http://localhost:8000/auth/login', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: { 'Content-Type': 'application/json' },
    }).then((response) => (response.status === 200 ? window.location = '/index' : window.location = '/'));
  }

  render() {
    return (
      <div>
        <h1>Login</h1>
        <LoginForm onLogin={this.handleLogin} />
        <Link to="/signup">Create an account here</Link>
      </div>
    );
  }
}
