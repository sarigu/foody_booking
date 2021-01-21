import React, { Component } from 'react';

export default class AddTableForm extends Component {
  render() {
    return (
      <form onSubmit={this.props.onAddTable}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" placeholder="table name" />
        <label htmlFor="capacity">Capacity</label>
        <input type="text" name="capacity" placeholder="capacity" />
        <button>Add Table</button>
      </form>
    );
  }
}
