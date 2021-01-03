import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class SeatBooking extends Component {
  render() {
    const {
      BookingID, TimeSlotID, UserID, Status,
    } = this.props.item;

    return (
      <div>
        <div><h2> {BookingID}</h2></div>
        <div><span className="boldText">Time:</span> {TimeSlotID}</div>
        <div><span className="boldText">User:</span> {UserID}</div>
        <div><span className="boldText">Status:</span> {Status}</div>
      </div>
    );
  }
}

SeatBooking.propTypes = {
  item: PropTypes.object,
};
