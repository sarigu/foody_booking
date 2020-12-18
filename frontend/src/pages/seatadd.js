import React, { useState, useEffect } from 'react';
import Axios from 'axios'

export default class SeatAdd extends React.Component {
    constructor() {
        super();
        this.state = { seatPlans: [] };
    }
    
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
                    <label>Seat Name</label>
                    <input type="text" name="seatName" onChange={(e) => {
                        setSeatName(e.target.value);
                    }} />
                    <label>Seat Capacity</label>
                    <input type="text" name="seatCapacity" onChange={(e) => {
                        setSeatCapacity(e.target.value);
                    }} />
                    <label>Seat Status</label>
                    <input type="text" name="seatName" onChange={(e) => {
                        setSeatStatus(e.target.value);
                    }} />
                    <button onClick='{submitReview}'>Submit</button>
                </div>
            </div>
        );
    }
}