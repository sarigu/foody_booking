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
    const customerid = localStorage.getItem('customerid');
    const customeremail = localStorage.getItem('customeremail');
    const customername = localStorage.getItem('customername');
    this.setState({
      groupsize: groupsize, date: date, tableID: tableID, timeslotID: timeslotID, startTime: startTime, endTime: endTime, customerid: customerid, customeremail: customeremail, customername: customername,
    });
  }

  handleBooking = () => {
    fetch('http://localhost:8000/booking', {
      method: 'POST',
      body: JSON.stringify({
        userID: this.state.customerid,
        timeslotID: this.state.timeslotID,
        tableID: this.state.tableID,
        userEmail: this.state.customeremail,
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
            <Link to="/booking/restaurant_add">Customer Info</Link>
          </div>
          <div>
            <h2>Confirm booking in behalf of customer</h2>
            {this.state.bookingError === true ? (<div>Oops something went wrong</div>)
              : (<div />)}
            {this.state.bookingDone === true ? (<div>You booked a table in behalf of a customer! <br /> We will send the customer an email shortly to</div>)
              : (
                <div>
                  <div>In behalf of: {this.state.customername} </div>
                  <div>People: {this.state.groupsize}</div>
                  <div>Time: {this.state.startTime} to {this.state.endTime}</div>
                  <div>Date: {this.state.date}</div>
                  <div>Table: {this.state.tableID}</div>
                  <button onClick={this.handleBooking}>Confirm</button>
                </div>
              )}
          </div>
        </div>
      </div>
    );
  }
}
