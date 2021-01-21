import React, { Component } from 'react';

export default class Table extends Component {
  render() {
    const {
      Capacity, Name,
    } = this.props.item;

    return (
      <div>
        <h2>Table {Name}</h2>
        <div>For:  {Capacity} people</div>
      </div>

    );
  }
}
