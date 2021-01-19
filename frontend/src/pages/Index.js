import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/NavBar';

export default class Index extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <div className="main">
          <div className="flex">
            <h1 className="welcome-heading">Hello User</h1>
            <span className="emojis">&#128522;</span>
            <span className="emojis">&#9995;</span>
          </div>
          <div className="index-container">
            <div className="booking-container">
              <div className="flex">
                <h2>Do you want to book a table? </h2>
                <span className="emojis">&#127869;</span>
              </div>
              <Link to="/booking/time" className="link-elem">Find vacant tables</Link>
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
      </div>
    );
  }
}
