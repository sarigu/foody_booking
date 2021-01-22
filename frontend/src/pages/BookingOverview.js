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
        this.setState({ activeBookings: data.activeBookings[0], oldBookings: data.oldBookings[0] });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleBookingStatus = (e) => {
    const status = e.target.id;
    if (status === 'old') {
      this.setState({ status: 'old' });
    } else {
      this.setState({ status: 'active' });
    }
  }

  render() {
    return (
      <div>
        {this.props.isAuth === true && this.props.usertype === 'restaurant' ? (
          <div>
            <Navbar />
            <div className="main">
              <h1>Booking Overview &#128203;</h1>
              <div className="flex">  <div id="old" className="bar-elem" onClick={this.handleBookingStatus}>Old</div>   <div id="active" className="bar-elem" onClick={this.handleBookingStatus}>Active</div></div>
              {this.state.status === 'active' ? (
                <div>
                  <h2>Active</h2>
                  <div>     {this.state.activeBookings ? this.state.activeBookings.map((booking, index) => (
                    <Booking key={`booking${index}`} item={booking} />
                  )) : (<div> No active Bookings </div>)}
                  </div>
                </div>
              ) : this.state.status === 'old' ? (
                <div>
                  <h2>Old</h2>
                  <div>
                    {this.state.oldBookings ? this.state.oldBookings.map((booking, index) => (
                      <Booking key={`booking${index}`} item={booking} />
                    )) : (<div> No old Bookings </div>)}
                  </div>
                </div>
              ) : (<div>Choose if you want to see old or active bookings</div>)}

            </div>
          </div>
        )
          : (<div><h2>Not authorized</h2></div>)}
      </div>
    );
  }
}
