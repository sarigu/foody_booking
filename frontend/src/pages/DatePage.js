import React, { Component } from 'react';
import Navbar from '../components/NavBar';

export default class DatePage extends Component {
  handleDate = (e) => {
    e.preventDefault();
    const date = e.target.date.value;
    localStorage.setItem('date', date);
    window.location = '/booking/time';
  }

  render() {
    return (
      <div>
        {this.props.isAuth === true ? (
          <div>
            <Navbar />
            <div className="main">
              <h2>Choose a date &#128198;</h2>
              <form onSubmit={this.handleDate}>
                <label htmlFor="text">Date</label>
                <input type="date" id="date" name="date" placeholder="yyyy-mm-dd" />
                <button type="submit">Go</button>
              </form>
            </div>
          </div>
        )
          : (<div><h2>Not authorized</h2></div>)}
      </div>
    );
  }
}
