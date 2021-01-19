import React, { Component } from 'react';
import Navbar from '../components/NavBar';

export default class DatePage extends Component {
  handleDate = (e) => {
    e.preventDefault();
    const date = e.target.date.value;
    console.log(date);
    localStorage.setItem('date', date);
    window.location = '/booking/time';
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="main">
          <h2>Choose a date</h2>
          <form onSubmit={this.handleDate}>
            <label htmlFor="text">Date</label>
            <input type="date" id="date" name="date" />
            <button type="submit">Go</button>
          </form>
        </div>
      </div>
    );
  }
}
