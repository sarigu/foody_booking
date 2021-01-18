import React from 'react';
import ls from 'local-storage';
import MenuItem from '../components/MenuItem';
import MenuItemForm from '../components/MenuItemForm';
import Navbar from '../components/NavBar';
import MenuItemUpdate from '../components/MenuItemUpdate';

export default class Menu extends React.Component {
  constructor() {
    super();
    this.state = { menuItems: [], update: false, updateID: '' };
  }

  componentDidMount = () => {
    this.getMenu();
  }

  getMenu = async () => {
    try {
      const response = await fetch('http://localhost:8000/menu');
      const data = await response.json();
      this.setState({ menuItems: data.data });
    } catch (e) {
      console.log(e);
    }
  }

  handleAddMenuItem = async (e) => {
    e.preventDefault();
    const { menuItem, price, description } = e.target;

    await fetch('http://localhost:8000/menu/items', {
      method: 'POST',
      body: JSON.stringify({
        menuItem: menuItem.value,
        price: price.value,
        description: description.value,
      }),
      headers: { 'Content-Type': 'application/json' },
    }).then((response) => (console.log(response)));

    this.getMenu();
  }

  handleDeleteMenuItem = async (e) => {
    const { id } = e.target;

    try {
      const response = await fetch(`http://localhost:8000/menu/item/${id}`);
      if (response.status === 200) {
        this.getMenu();
      }
    } catch (err) {
      console.log(err);
    }
  }

  handleChangeToUpdateItem = async (e) => {
    const menuItemID = parseInt(e.target.id, 10);
    this.setState({ update: true, updateID: menuItemID });
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="main">
          <h1>Menu</h1>
          <div>
            {this.state.menuItems && this.state.menuItems.map((item, index) => (
              this.state.update === true && this.state.updateID === item.MenuID
                ? (
                  <div key={`item${index}`}>
                    <MenuItemUpdate item={item} />
                  </div>
                ) : (
                  <div key={`item${index}`}>
                    <MenuItem item={item} />
                    <button id={`${item.MenuID}`} onClick={this.handleDeleteMenuItem}>Remove</button>
                    <button id={`${item.MenuID}`} onClick={this.handleChangeToUpdateItem}>Update</button>
                  </div>
                )
            ))}
          </div>
          <br />
          <div>
            <h2>Add new menu items</h2>
            <MenuItemForm onAddMenuItem={this.handleAddMenuItem} />
          </div>
        </div>
      </div>
    );
  }
}
