import React, { Component } from 'react';

export default class MenuItemForm extends Component {
  render() {
    return (
      <form onSubmit={this.props.onAddMenuItem}>
        <label htmlFor="menuItem">Menu Item</label>
        <input type="text" id="menuItem" name="menuItem" placeholder="menu item" />
        <label htmlFor="price">Price</label>
        <input type="number" min="1" step="any" id="price" name="price" placeholder="price" />
        <label htmlFor="description">Description</label>
        <input type="text" id="description" name="description" placeholder="description" />
        <button>Add menu item</button>
      </form>
    );
  }
}
