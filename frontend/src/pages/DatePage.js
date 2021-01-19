import React, { Component } from 'react';
import Navbar from '../components/NavBar';

export default class DatePage extends Component {
    handleDate = (e) => {
      e.preventDefault();
      console.log(`date: ${e.target.date.value}`);
      const date = e.target.date.value;
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
              <input type="text" id="date" name="date" placeholder="dd-mm-yyyy" />
              <button type="submit">Go</button>
            </form>
          </div>
        </div>
      );
    }
}
