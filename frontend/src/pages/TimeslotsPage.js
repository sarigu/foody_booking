import React from 'react';
import Navbar from '../components/NavBar';
import DateForm from '../components/DateForm';

export default class TimeslotsPage extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

    handleTimeSlots = async (e) => {
      const date = event.target.date.value;

      fetch(`http://localhost:8000/timeslot/${date}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    render() {
      return (
        <div>
          <Navbar />
          <div className="main">
            <h2>Choose a date and see available times</h2>
            <div>
              <DateForm onDateSelection={this.handleTimeSlots} />
            </div>
          </div>
        </div>
      );
    }
}
