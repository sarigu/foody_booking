import React, { Component } from 'react';

export default class Timeslot extends Component {
  handleChosenTimeslot = (e) => {
    e.preventDefault();
    const timeslotID = e.target.getAttribute('data-id');
    const timeslotStart = e.target.getAttribute('data-start');
    const timeslotEnd = e.target.getAttribute('data-end');
    localStorage.setItem('timeslotID', timeslotID);
    localStorage.setItem('timeslotStart', timeslotStart);
    localStorage.setItem('timeslotEnd', timeslotEnd);
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
        <button data-id={TimeSlotID} data-start={StartTime} data-end={EndTime} onClick={this.handleChosenTimeslot}>Pick</button>
      </div>

    );
  }
}
