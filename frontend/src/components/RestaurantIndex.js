import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class RestaurantIndex extends Component {
  render() {
    return (
      <div>
        <div className="flex">
          <h1 className="welcome-heading">Hello Restaurant</h1>
          <span className="emojis">&#128522;</span>
          <span className="emojis">&#9995;</span>
        </div>
        <div className="index-container">
          <div className="booking-container">
            <div className="flex">
              <h2>Bookings</h2>
              <span className="emojis">&#127869;</span>
            </div>
            <Link to="/booking/date" className="link-elem">Make Booking</Link>
            <br />
            <Link to="/overview" className="link-elem">Booking Overview</Link>
          </div>
          <div className="menu-container">
            <div className="flex">
              <h2>Menu & Restaurant</h2>
              <span className="emojis">&#127828;</span>
            </div>
            <Link to="/editmenu" className="link-elem">Update Menu</Link>
            <br />
            <Link to="/restaurantdetails" className="link-elem">Edit Restaurant Info</Link>
            <br />
            <Link to="/staff" className="link-elem">Add staff</Link>
          </div>
        </div>
      </div>
    );
  }
}
