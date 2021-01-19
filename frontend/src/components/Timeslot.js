import React, { Component } from 'react';

export default class Timeslot extends Component {
  handleChosenTimeslot = (e) => {
    e.preventDefault();
    const timeslotID = e.target.id;
    localStorage.setItem('timeslotID', timeslotID);
    window.location = '/booking/groupsize';
  }

  render() {
    const {
      TimeSlotID, Date, StartTime, EndTime,
    } = this.props.item;

    return (

      <div>
        <h2>Timeslot</h2>
        Date: {Date}
        <br />
        Start time: {StartTime}
        <br />
        End time: {EndTime}
        <br />
        <button id={TimeSlotID} onClick={this.handleChosenTimeslot}>Pick</button>
      </div>

    );
  }
}
