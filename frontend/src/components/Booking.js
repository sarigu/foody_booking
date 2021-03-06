import React, { Component } from 'react';

export default class Booking extends Component {
  handleDeleteBooking = (e) => {
    const { id, table } = e.target.dataset;
    try {
      fetch(`http://localhost:8000/bookings/${id}/${table}`)
        .then((response) => (response.status === 200 ? location.reload() : location.reload()));
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const {
      BookingID, email, Date, StartTime, EndTime, Capacity, TableID, firstName, lastName,
    } = this.props.item;
    return (
      <div>
        <h2>Booking {BookingID}</h2>
        <div>
          <div>
            <span className="boldText">For: </span>
            {firstName} {lastName}
          </div>
          <div>
            <span className="boldText">Email: </span>
            {email}
          </div>
          <div>
            <span className="boldText">Date: </span>
            {Date}
          </div>
          <div>
            <span className="boldText">From </span>
            {StartTime}
            <span className="boldText">To </span>
            {EndTime}
          </div>
          <div>
            <span className="boldText">For: </span>
            {Capacity} People
          </div>
        </div>
        <button data-id={`${BookingID}`} data-table={`${TableID}`} onClick={this.handleDeleteBooking}>Delete</button>
      </div>
    );
  }
}
