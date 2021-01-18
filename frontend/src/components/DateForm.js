import React, { Component } from 'react';

export default class LoginForm extends Component {
  render() {
    return (
      <form onSubmit={this.props.onDateSelection}>
        <label htmlFor="email">Date</label>
        <input type="date" id="date" name="date" />
        <button type="submit">Go</button>
      </form>
    );
  }
}
