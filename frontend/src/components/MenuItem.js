import React, { Component } from 'react';

export default class MenuItem extends Component {
  render() {
    const { Item, Price, Description } = this.props.item;

    return (
      <div className="menu-item">
        <div>
          <h3>{Item}</h3>
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
