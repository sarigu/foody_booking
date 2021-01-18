import React, { Component } from 'react';

export default class MenuItemUpdate extends Component {
    updateMenuItem = (e) => {
      e.preventDefault();
      console.log(e);
    };

    render() {
      const { Item, Price, Description } = this.props.item;
      return (
        <div>
          <div>
            <h2>For {Item}</h2>
          </div>
          <form onSubmit={this.updateMenuItem}>
            <label htmlFor="item">Menu Item</label>
            <input type="text" id="item" name="item" value={Item} />
            <label htmlFor="price">Price</label>
            <input type="number" min="1" step="any" id="price" name="price" value={Price} />
            <label htmlFor="description">Description</label>
            <input type="text" id="description" name="description" value={Description} />
            <button>Update</button>
          </form>
        </div>
      );
    }
}
