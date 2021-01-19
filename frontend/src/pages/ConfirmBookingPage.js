import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/NavBar';

export default class ConfirmBookingPage extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

    componentDidMount = () => {
      const date = localStorage.getItem('date');
      const groupsize = localStorage.getItem('groupsize');
      const tableID = localStorage.getItem('tableID');
      this.setState({ groupsize: groupsize, date: date, tableID: tableID });
    }

    handleBooking = (e) => {
      console.log('confirm booking');
      // post local storage
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
              <Link to="/booking/tables">Group Size</Link>
            </div>
            <div>
              <h2>Confirm Booking</h2>
              <div>
                <div>People: {this.state.groupsize}</div>
                <div>Time: </div>
                <div>Date: {this.state.date}</div>
                <div>Table: {this.state.tableID}</div>
                <button onClick={this.handleBooking}>Make the booking</button>
              </div>
            </div>
          </div>
        </div>
      );
    }
}
