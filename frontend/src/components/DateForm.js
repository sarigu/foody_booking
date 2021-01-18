import React, { Component } from 'react';

export default class DateForm extends Component {
  render() {
    return (
      <form onSubmit={this.props.onSelectedDate}>
        <label htmlFor="text">Date</label>
        <input type="text" id="date" name="date" placeholder="dd-mm-yyyy" />
        <button>Go</button>
      </form>
    );
  }
}
