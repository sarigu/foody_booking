import React, { Component } from 'react';

export default class PartyForm extends Component {
  render() {
    return (
      <div>
        <h2>How many people are in your party?</h2>
        <form onSubmit={this.props.onSubmit}>
          <label htmlFor="groupsize" />
          <input type="number" id="groupsize" name="groupsize" placeholder="number" />
          <button type="submit">Go</button>
        </form>
      </div>
    );
  }
}
