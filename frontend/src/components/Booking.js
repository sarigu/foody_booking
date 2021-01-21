import React, { Component } from 'react';

export default class Booking extends Component {
  render() {
    const { BookingID } = this.props.item;
    return (
      <div>
        <h2>{BookingID}</h2>
        <div><button>Delete</button>
        </div>
      </div>
    );
  }
}
