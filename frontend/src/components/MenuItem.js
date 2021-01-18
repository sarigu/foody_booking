import React, { Component } from 'react';

export default class MenuItem extends Component {
  render() {
    const { Item, Price, Description } = this.props.item;

    return (
      <div>
        <div>
          <h2>{Item}</h2>
        </div>
        <div>
          <span className="boldText">Price: </span>
          {Price} DK
        </div>
        <div>
          <span className="boldText">Description: </span>
          {Description}
        </div>
      </div>
    );
  }
}
