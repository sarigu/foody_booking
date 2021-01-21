import React from 'react';
import MenuItem from '../components/MenuItem';
import Navbar from '../components/NavBar';

export default class Menu extends React.Component {
  constructor() {
    super();
    this.state = { menuItems: [] };
  }

  componentDidMount = () => {
    fetch('http://localhost:8000/menu')
      .then((res) => res.json())
      .then((data) => {
        this.setState({ menuItems: data.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        {this.props.isAuth === true ? (
          <div>
            <Navbar />
            <div className="main">
              <h1>Menu</h1>
              {this.state.menuItems && this.state.menuItems.map((item, index) => (
                <MenuItem key={`item${index}`} item={item} />
              ))}
            </div>
          </div>
        )
          : (<div><h2>Not authorized</h2></div>)}
      </div>
    );
  }
}
