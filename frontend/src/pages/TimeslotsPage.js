import React from 'react';
import Navbar from '../components/NavBar';
import Timeslot from '../components/Timeslot';
import DateForm from '../components/DateForm';

export default class TimeslotsPage extends React.Component {
  constructor() {
    super();
    this.state = { timeslots: [] };
  }

    handleTimeSlots = async (e) => {
      e.preventDefault();
      const date = e.target.date.value;
      fetch(`http://localhost:8000/timeslot/${date}`)
        .then((res) => res.json())
        .then((data) => {
          this.setState({ timeslots: data });
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
            <DateForm onSelectedDate={this.handleTimeSlots} />
            <div>
              {this.state.timeslots && this.state.timeslots.map((timeslot, index) => (
                <Timeslot key={`timeslot${index}`} item={timeslot} />
              ))}
            </div>
          </div>
        </div>
      );
    }
}
