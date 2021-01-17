import React from 'react';
import MenuItem from '../components/MenuItem';
import MenuItemForm from '../components/MenuItemForm';
import Navbar from '../components/NavBar';

export default class Menu extends React.Component {
  constructor() {
    super();
    this.state = { menuItems: [] };
  }

    componentDidMount = async () => {
      try {
        const response = await fetch('http://localhost:8000/menu');
        const data = await response.json();
        this.setState({ menuItems: data.data });
      } catch (e) {
        console.log(e);
      }
    }

    handleNewMenuItem = async (e) => {
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
      }).then((response) => (response.status === 200 ? window.location = '/editmenu' : window.location = '/editmenu'));
    }

    handleDeleteItem = async (e) => {
      console.log(e.target.id);

      const { id } = e.target;

      try {
        const response = await fetch(`http://localhost:8000/menu/items/${id}`);
        console.log(response);
        if (response.status === 200) {
          window.location = '/editmenu';
        }
      } catch (err) {
        console.log(err);
      }
    }

    handleUpdateItem = async (e) => {
      console.log('update');
    }

    render() {
      return (
        <div>
          <Navbar />
          <div className="main">
            <h1>Menu</h1>
            <div>
              {this.state.menuItems && this.state.menuItems.map((item, index) => (
                <div key={`item${index}`}>
                  <MenuItem item={item} />
                  <button id={`${item.MenuID}`} onClick={this.handleDeleteItem}>Remove</button>
                  <button id={`${item.MenuID}`} onClick={this.handleUpdateItem}>Update</button>
                </div>
              ))}
            </div>
            <br />
            <div>
              <h2>Add new menu items</h2>
              <MenuItemForm onAddMenuItem={this.handleNewMenuItem} />
            </div>
          </div>
        </div>
      );
    }
}
