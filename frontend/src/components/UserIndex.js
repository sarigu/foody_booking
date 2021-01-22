import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class UserIndex extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount = () => {
    this.setState({ userFirstName: localStorage.getItem('userFirstName') });
  }

  render() {
    return (
      <div>
        <div className="flex">
          <h1 className="welcome-heading">Hello, {this.state.userFirstName}</h1>
          <span className="emojis">&#128522;</span>
          <span className="emojis">&#128075;</span>
        </div>
        <div className="index-container">
          <div className="booking-container">
            <div className="flex">
              <h2>Want to book a table? </h2>
              <span className="emojis">&#127869;</span>
            </div>
            <Link to="/booking/date" className="link-elem">Find vacant tables</Link>
            <br />
            <Link to="/cancel_booking" className="link-elem">Cancel a booking</Link>
          </div>
          <div className="menu-container">
            <div className="flex">
              <h2>Do you want to checkout the menu?</h2>
              <span className="emojis">&#127828;</span>
            </div>
            <Link to="/menu" className="link-elem">See the menu</Link>
            <br />
            <Link to="/recommendation" className="link-elem">Get a surprise menu recommendation</Link>
          </div>
        </div>
      </div>
    );
  }
}
