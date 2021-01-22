import React, { Component } from 'react';

export default class Staff extends Component {
  render() {
    const { firstName, lastName, email } = this.props.item;

    return (
      <div>
        <div>
          <h2>{firstName} {lastName}</h2>
        </div>
        <div>
          <span className="boldText">Email: </span>
          {email}
        </div>
      </div>
    );
  }
}
