import React, { Component } from 'react';

export default class SignUpForm extends Component {
    render() {
        return (
            <form onSubmit={this.props.onCreateAccount}>
                <input type="text" name="username" placeholder="username"></input>
                <input type="email" name="email" placeholder="email"></input>
                <input type="password" name="password" placeholder="password"></input>
                <button>Create Account</button>
            </form>
        );

    }
}