import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/NavBar';

export default class RestaurantDetails extends React.Component {
  constructor() {
    super();
    this.state = { restaurantData: {} };
  }

  componentDidMount = async () => {
    try {
      const response = await fetch('http://localhost:8000/restaurantdetails');
      const data = await response.json();
      this.setState({ restaurantData: data.data[0] });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    const {
      Name, Description, Address, Email, Phone,
    } = this.state.restaurantData;

    return (
      <div>
        <Navbar />
        <div className="main">
          <h1>Restaurant Details</h1>
          <div>
            <div>
              <span className="boldText">Name:</span>
              {Name}
            </div>
            <div>
              <span className="boldText">Address:</span>
              {Address}
            </div>
            <div>
              <span className="boldText">Description:</span>
              {Description}
            </div>
            <div>
              <span className="boldText">Email:</span>
              {Email}
            </div>
            <div>
              <span className="boldText">Phone:</span>
              {Phone}
            </div>
          </div>
          <Link to="/updatedetails">Edit</Link>
        </div>
      </div>
    );
  }
}
