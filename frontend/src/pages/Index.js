import React, { Component } from 'react';
import Navbar from '../components/NavBar';
import UserIndex from '../components/UserIndex';
import RestaurantIndex from '../components/RestaurantIndex';
import Footer from '../components/Footer';

export default class Index extends Component {
  render() {
    return (
      <div>
        {this.props.isAuth === true && this.props.usertype === 'user' ? (
          <div>
            <Navbar />
            <div className="main">
              <UserIndex />
            </div>
            <Footer />
          </div>
        ) : this.props.isAuth === true && this.props.usertype === 'restaurant' ? (
          <div>
            <Navbar />
            <div className="main">
              <RestaurantIndex />
            </div>
          </div>
        )
          : (<div><h2>Not authorized</h2></div>)}

      </div>
    );
  }
}
