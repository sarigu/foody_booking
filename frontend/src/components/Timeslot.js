import React, { Component } from 'react';

export default class Timeslot extends Component {
  handleChosenTimeslot = (e) => {
    const timeslotID = e.target.id;
    console.log('efe' + timeslotID);
    localStorage.setItem('timeslotID', timeslotID);
  }

  handleCheck = () => {
    const timeslotID = localStorage.getItem('timeslotID');
    console.log(timeslotID);
  }

  render() {
    const {
      TimeSlotID, Date, SeatID, StartTime, EndTime,
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
        <button id={TimeSlotID} onClick={this.handleChosenTimeslot}>Pick</button>
        <button onClick={this.handleCheck}>Check</button>
      </div>
    );
  }
}
