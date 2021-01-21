import React, { Component } from 'react';

export default class Table extends Component {
  render() {
    const {
      Capacity, Name, TableStatus,
    } = this.props.item;

    return (
      <div>
        {TableStatus === 1 ? (
          <div className="reservedTable">
            <h2>{Name} / Reserved </h2>
            <div>For: {Capacity} people</div>
          </div>
        )
          : (
            <div>
              <h2>{Name} / Free</h2>
              <div>For:  {Capacity} people</div>
            </div>
          )}
      </div>

    );
  }
}
