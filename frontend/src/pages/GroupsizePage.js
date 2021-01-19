import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/NavBar';

export default class GroupsizePage extends Component {
  handleGroupSize = (e) => {
    e.preventDefault();
    const groupsize = e.target.groupsize.value;
    localStorage.setItem('groupsize', groupsize);
    window.location = '/booking/tables';
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="main">
          <div>
            <Link to="/booking/date">Date</Link>
            <Link to="/booking/time">Timeslot</Link>
          </div>
          <h2>How many people are in your party?</h2>
          <form onSubmit={this.handleGroupSize}>
            <label htmlFor="groupsize" />
            <input type="number" id="groupsize" name="groupsize" placeholder="number" />
            <button type="submit">Go</button>
          </form>
        </div>
      </div>
    );
  }
}
