import React from 'react';
import MenuItem from '../components/MenuItem';
import SeatPlan from '../components/Seatplan';

export default class Seat extends React.Component {
  constructor() {
    super();
    this.state = { seatPlans: [] };
  }

    componentDidMount = async () => {
      try {
        const response = await fetch('http://localhost:8000/seat');
        const data = await response.json();
        this.setState({ seatPlans: data.data });
      } catch (e) {
        console.log(e);
      }
    }

    render() {
      return (
        <div>
          <h1>Seat</h1>
          {this.state.seatPlans && this.state.seatPlans.map((item, index) => (
            <SeatPlan key={`item${index}`} item={item} />
          ))}
        </div>
      );
    }
}