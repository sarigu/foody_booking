import React from 'react';
import Navbar from '../components/NavBar';
import Booking from '../components/Booking';

export default class BookingOverview extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount = () => {
    fetch('http://localhost:8000/bookings')
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
        {this.props.isAuth === true && this.props.usertype === 'restaurant' ? (
          <div>
            <Navbar />
            <div className="main">
              <h1>Booking Overview</h1>
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
