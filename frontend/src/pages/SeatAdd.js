import React from 'react';

export default class SeatAdd extends React.Component {
  /* constructor() {
    super();
    this.state = { seatPlans: [] };
  } */

  render() {
    // const [seatName, setSeatName] = this.setState;
    // const [seatCapacity, setSeatCapacity] = this.setState;
    // const [seatStatus, setSeatStatus] = this.setState;

    // const submitReview = () => {
    //     console.log('submit clicked');
    //     // Axios.post('http://localhost:8000/')
    // };
    return (
      <div>
        <h1>Add a Table Seat</h1>
        <div className="form">
          <label htmlFor="seat-name">Seat Name</label>
          <input
            type="text"
            id="seat-name"
            name="seatName"
            onChange={(e) => {
              setSeatName(e.target.value);
            }}
          />
          <label htmlFor="seat-capacity">Seat Capacity</label>
          <input
            type="text"
            id="seat-capacity"
            name="seatCapacity"
            onChange={(e) => {
              setSeatCapacity(e.target.value);
            }}
          />
          <label htmlFor="seat-status">Seat Status</label>
          <input
            type="text"
            id="seat-status"
            name="seatName"
            onChange={(e) => {
              setSeatStatus(e.target.value);
            }}
          />
          <button>Submit</button>
        </div>
      </div>
    );
  }
}
