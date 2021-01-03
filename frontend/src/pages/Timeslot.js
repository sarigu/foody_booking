import React from 'react';
import TimeSlotPlan from '../components/Timeslotplan';

export default class TimeSlot extends React.Component {
  /* constructor() {
     super();
     this.state = { timeSlot: [] };
   } */

  componentDidMount = async () => {
    try {
      const response = await fetch('http://localhost:8000/timeslot');
      const data = await response.json();
      this.setState({ timeslots: data.data });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <div>
        <h1>Timeslot</h1>
        {this.state.timeslots && this.state.timeslots.map((item, index) => (
          <TimeSlotPlan key={`item${index}`} item={item} />
        ))}
      </div>
    );
  }
}
