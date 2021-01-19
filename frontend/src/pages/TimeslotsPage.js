import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/NavBar';
import Timeslot from '../components/Timeslot';

export default class TimeslotsPage extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount = async () => {
    const date = localStorage.getItem('date');
    fetch(`http://localhost:8000/timeslots/${date}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.message) {
          this.setState({ timeslots: [] });
        } else {
          this.setState({ timeslots: data });
        }
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
          <div>
            <Link to="/booking/date">Date</Link>
          </div>
          <h2>Choose a time</h2>
          <div>
            {this.state.timeslots && this.state.timeslots.map((timeslot, index) => (
              <Timeslot key={`timeslot${index}`} item={timeslot} />
            ))}
            <p>No available timeslots</p>
          </div>
        </div>
      </div>
    );
  }
}
