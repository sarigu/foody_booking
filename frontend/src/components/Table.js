import React, { Component } from 'react';

export default class Table extends Component {
  handlePickedTable = (e) => {
    const tableID = e.target.id;
    localStorage.setItem('tableID', tableID);
    window.location = '/booking/confirm';
  }

  render() {
    const {
      TableID, Capacity,
    } = this.props.item;

    return (
      <div>
        <h2>Table {TableID}</h2>
        <div>For:  {Capacity} people</div>
        <button id={TableID} onClick={this.handlePickedTable}>Pick</button>
      </div>

    );
  }
}
