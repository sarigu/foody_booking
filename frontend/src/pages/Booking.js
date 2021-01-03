import React from 'react';
import SeatBooking from '../components/SeatBooking';

export default class Booking extends React.Component {
  /* constructor() {
     super();
     this.state = { booking: [] };
   } */

  componentDidMount = async () => {
    try {
      const response = await fetch('http://localhost:8000/booking');
      const data = await response.json();
      this.setState({ bookings: data.data });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <div>
        <h1>Bookings</h1>
        {this.state.bookings && this.state.bookings.map((item, index) => (
          <SeatBooking key={`item${index}`} item={item} />
        ))}
      </div>
    );
  }
}
