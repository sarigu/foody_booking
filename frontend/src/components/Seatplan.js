import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class SeatPlan extends Component {
  render() {
    const {
      SeatID, SeatName, SeatCapacity, SeatStatus,
    } = this.props.item;

    return (
      <div>
        <div><h2> {SeatName}</h2></div>
        <div><span className="boldText">Seat Capacity:</span> {SeatCapacity}</div>
        <div><span className="boldText">Seat Status:</span> {SeatStatus}</div>
      </div>
    );
  }
}

SeatPlan.propTypes = {
  item: PropTypes.object,
};
