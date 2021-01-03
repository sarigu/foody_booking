import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class TimeSlotPlan extends Component {
  render() {
    const {
      TimeSlotID, SeatID, Date, StartTime, EndTime,
    } = this.props.item;

    return (
      <div>
        <div><h2> {TimeSlotID}</h2></div>
        <div><span className="boldText">Date:</span> {Date}</div>
        {/* <div><span className="boldText">Date:</span> {moment(Date).format('DD MMM, YYYY')}</div> */}
        <div><span className="boldText">Time:</span> Start : {StartTime}</div>
        <div><span className="boldText">Time:</span> End : {EndTime}</div>
        <div><a href="#">Book This Table</a></div>
      </div>
    );
  }
}

TimeSlotPlan.propTypes = {
  item: PropTypes.object,
};
