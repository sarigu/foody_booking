import React, { Component } from 'react';
import SignUpForm from '../components/SignUpForm';
import { Link } from 'react-router-dom';

export default class SignUp extends Component {

    handleSignUp = async (e) => {
        e.preventDefault();
        const { username, email, password } = e.target;

        const connection = await fetch("http://localhost:8000/signup", {
            method: "POST",
            body: JSON.stringify({
                username: username.value,
                email: email.value,
                password: password.value
            }),
            headers: { 'Content-Type': 'application/json' },
        });

        const data = await connection.json();
        console.log(data)


        window.location = '/';
    }

    render() {
        return (
            <div>
                <h1>Sign Up</h1>
                <SignUpForm onCreateAccount={this.handleSignUp}></SignUpForm>
                <Link to="/">Already have an account? Log in</Link>
            </div>
        );
    }
}