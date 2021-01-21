import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/NavBar';

export default class ConfirmByRestaurant extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount = () => {
    const date = localStorage.getItem('date');
    const groupsize = localStorage.getItem('groupsize');
    const timeslotID = localStorage.getItem('timeslotID');
    const tableID = localStorage.getItem('tableID');
    const startTime = localStorage.getItem('timeslotStart');
    const endTime = localStorage.getItem('timeslotEnd');
    this.setState({
      groupsize: groupsize, date: date, tableID: tableID, timeslotID: timeslotID, startTime: startTime, endTime: endTime,
    });
  }

  handleAddedData = async (e) => {
    e.preventDefault();
    const { username, email } = e.target;

    await fetch('http://localhost:8000/auth/create_account', {
      method: 'POST',
      body: JSON.stringify({
        username: username.value,
        email: email.value,
      }),
      headers: { 'Content-Type': 'application/json' },
    }).then((res) => res.json())
      .then((data) => {
        console.log(data.userid);
        this.handleBooking(data.userid, email);
      });
  }

  handleBooking = (userid, userEmail) => {
    console.log('make booking');
    console.log(userid);

    fetch('http://localhost:8000/booking', {
      method: 'POST',
      body: JSON.stringify({
        userID: userid,
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
            <h2>Confirm booking in behalf of customer</h2>
            {this.state.bookingError === true ? (<div>Oops something went wrong</div>)
              : (<div />)}
            {this.state.bookingDone === true ? (<div>You booked a table in behalf of a customer! <br /> We will send the customer an email shortly to</div>)
              : (
                <div>
                  <div>People: {this.state.groupsize}</div>
                  <div>Time: {this.state.startTime} to {this.state.endTime}</div>
                  <div>Date: {this.state.date}</div>
                  <div>Table: {this.state.tableID}</div>
                  <form onSubmit={this.handleAddedData}>
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username" placeholder="username" />
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" placeholder="email" />
                    <button type="submit">Update</button>
                  </form>
                </div>
              )}
          </div>
        </div>
      </div>
    );
  }
}
