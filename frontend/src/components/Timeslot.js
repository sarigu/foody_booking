import React, { Component } from 'react';

export default class Timeslot extends Component {
  render() {
    const {
      Date, SeatID, StartTime, EndTime,
    } = this.props.item;

    return (
      <div>
        <h2>Timeslot</h2>
        {Date}
        <br />
        {SeatID}
        <br />
        {StartTime}
        <br />
        {EndTime}
        <br />
        <button>Pick</button>
      </div>
    );
  }
}
