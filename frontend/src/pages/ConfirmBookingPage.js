import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/NavBar';

export default class ConfirmBookingPage extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount = async () => {
    const date = localStorage.getItem('date');
    const groupsize = localStorage.getItem('groupsize');
    const tableID = localStorage.getItem('tableID');
    const timeslotID = localStorage.getItem('timeslotID');
    const startTime = localStorage.getItem('timeslotStart');
    const endTime = localStorage.getItem('timeslotEnd');
    const userEmail = localStorage.getItem('userEmail');

    console.log(userEmail);

    // get user
    await fetch('http://localhost:8000/auth/user', {
      method: 'POST',
      body: JSON.stringify({
        userEmail: userEmail,
      }),
      headers: { 'Content-Type': 'application/json' },
    }).then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.setState({
          groupsize: groupsize, date: date, tableID: tableID, timeslotID: timeslotID, startTime: startTime, endTime: endTime, userid: data.id, username: data.username, email: data.email,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleBooking = async (e) => {
    console.log('confirm booking');
    await fetch('http://localhost:8000/booking', {
      method: 'POST',
      body: JSON.stringify({
        userID: this.state.userid,
        timeslotID: this.state.timeslotID,
        tableID: this.state.tableID,
        userEmail: userEmail
      }),
      headers: { 'Content-Type': 'application/json' },
    }).then((response) => (response.status === 200 ? this.setState({ bookingDone: true }) : this.setState({ bookingError: true })));
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="main">
          <div>
            <Link to="/booking/date">Date</Link>
            <Link to="/booking/time">Timeslot</Link>
            <Link to="/booking/groupsize">Group Size</Link>
            <Link to="/booking/tables">Tables</Link>
          </div>
          <div>
            <h2>Confirm Booking</h2>
            {this.state.bookingError === true ? (<div>Oops something went wrong</div>)
              : (<div />)}
            {this.state.bookingDone === true ? (<div>You booked a table! <br /> We will send you an email shortly</div>)
              : (
                <div>
                  <div>Booking for {this.state.username}</div>
                  <div>People: {this.state.groupsize}</div>
                  <div>Time: {this.state.startTime} to {this.state.endTime}</div>
                  <div>Date: {this.state.date}</div>
                  <div>Table: {this.state.tableID}</div>
                  <div>Will be send to: {this.state.email}</div>
                  <button onClick={this.handleBooking}>Make the booking</button>
                </div>
              )}
          </div>
        </div>
      </div>
    );
  }
}
