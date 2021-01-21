import React from 'react';
import Navbar from '../components/NavBar';
import Booking from '../components/Booking';

export default class CancelBooking extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount = () => {
    const userEmail = localStorage.getItem('userEmail');
    console.log(userEmail);
    // get user
    fetch('http://localhost:8000/auth/user', {
      method: 'POST',
      body: JSON.stringify({
        userEmail: userEmail,
      }),
      headers: { 'Content-Type': 'application/json' },
    }).then((res) => res.json())
      .then((data) => {
        this.getBookings(data.id);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getBookings(userid) {
    fetch(`http://localhost:8000/bookings/${userid}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.setState({ bookings: data.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        {this.props.isAuth === true ? (
          <div>
            <Navbar />
            <div className="main">
              <h1>Cancel a booking</h1>
              {this.state.bookings && this.state.bookings.map((booking, index) => (
                <Booking key={`booking${index}`} item={booking} />
              ))}
            </div>
          </div>
        )
          : (<div><h2>Not authorized</h2></div>)}
      </div>
    );
  }
}
