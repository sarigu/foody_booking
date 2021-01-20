import React, { Component } from 'react';
import Navbar from '../components/NavBar';
import UserIndex from '../components/UserIndex';
import RestaurantIndex from '../components/RestaurantIndex';

export default class Index extends Component {
  render() {
    return (
      <div>
        {this.props.isAuth === true && this.props.usertype === 'user' ? (
          <div> <Navbar />
            <div className="main">
              <UserIndex />
            </div>
          </div>
        ) : this.props.isAuth === true && this.props.usertype === 'restaurant' ? (
          <div> <Navbar />
            <div className="main">
              <RestaurantIndex />
            </div>
          </div>
        )
          : (<div>Not authorized</div>)}

      </div>
    );
  }
}
