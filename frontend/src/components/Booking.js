import React, { Component } from 'react';

export default class Booking extends Component {
  render() {
    const { BookingID } = this.props.item;
    return (
      <div>
        <h2>one booking</h2>
        <div>{BookingID}</div>
      </div>
    );
  }
}
