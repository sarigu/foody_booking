import React, { Component } from 'react';

export default class Staff extends Component {
  render() {
    const { username, email } = this.props.item;

    return (
      <div>
        <div>
          <h2>{username}</h2>
        </div>
        <div>
          <span className="boldText">Email: </span>
          {email}
        </div>
      </div>
    );
  }
}
