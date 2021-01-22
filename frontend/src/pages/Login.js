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
        <div className="main">
          <div className="flex">
            <h1 className="welcome-heading">Hello You</h1>
            <span className="emojis">&#128522;</span>
            <span className="emojis">&#128075;</span>
          </div>
          <h1>Login</h1>
          <LoginForm onLogin={this.handleLogin} />
          <Link className="link-elem" to="/signup">Create an account here</Link>
        </div>
      </div>
    );
  }
}
