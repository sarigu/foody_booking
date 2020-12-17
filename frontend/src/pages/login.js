import React, { Component } from 'react';
import LoginForm from '../components/loginForm';
import { Link } from 'react-router-dom';

export default class Login extends Component {

    handleLogin = async (e) => {
        e.preventDefault();

        const { email, password } = e.target;
        const user = { email: email.value, password: password.value };

        await fetch("http://localhost:8000/login", {
            method: "POST",
            body: JSON.stringify(user),
            headers: { 'Content-Type': 'application/json' },
        }).then(response =>
            response.status === 200 ? window.location = '/index' : window.location = '/login'
        );


    }

    render() {
        return (
            <div>
                <h1>Login</h1>
                <LoginForm onLogin={this.handleLogin}></LoginForm>
                <Link to="/signup">Create an account here</Link>
            </div>
        );

    }
}