import React, { Component } from 'react';

export default class MenuItemUpdate extends Component {
  handleUpdateMenuItem = async (e) => {
    e.preventDefault();
    const {
      item, price, description, itemID,
    } = e.target;

    await fetch('http://localhost:8000/menu/item/', {
      method: 'POST',
      body: JSON.stringify({
        itemID: itemID.value,
        item: item.value,
        price: price.value,
        description: description.value,
      }),
      headers: { 'Content-Type': 'application/json' },
    }).then((response) => (response.status === 200 ? window.location = '/editmenu' : console.log('error')));
  };

  render() {
    const {
      Item, Price, Description, MenuID,
    } = this.props.item;
    return (
      <div>
        <div>
          <h2>For {Item}</h2>
        </div>
        <form onSubmit={this.handleUpdateMenuItem}>
          <input type="hidden" id="itemID" value={MenuID} name="itemID" />
          <label htmlFor="item">Menu Item</label>
          <input type="text" id="item" name="item" defaultValue={Item} />
          <label htmlFor="price">Price</label>
          <input type="number" min="1" step="any" id="price" name="price" defaultValue={Price} />
          <label htmlFor="description">Description</label>
          <input type="text" id="description" name="description" defaultValue={Description} />
          <button type="submit">Update</button>
        </form>
      </div>
    );
  }
}
