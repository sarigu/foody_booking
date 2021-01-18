import React from 'react';
import Navbar from './NavBar';

export default class RestaurantForm extends React.Component {
  constructor() {
    super();
    this.state = { restaurantData: {} };
  }

  componentDidMount = () => {
    fetch('http://localhost:8000/restaurantdetails')
      .then((res) => res.json())
      .then((data) => {
        this.setState({ restaurantData: data.data[0] });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleDetailsUpdate = async (e) => {
    e.preventDefault();

    const connection = await fetch('http://localhost:8000/restaurantdetails', {
      method: 'POST',
      body: JSON.stringify({
        name: event.target.name.value, address: event.target.address.value, description: event.target.description.value, email: event.target.email.value, phone: event.target.phone.value,
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await connection.json();
    console.log(data);
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
          <form id="retaurantForm" method="POST" onSubmit={this.handleDetailsUpdate}>
            <label htmlFor="name">Name</label>
            <input name="name" id="name" type="text" defaultValue={Name} />
            <label htmlFor="address">Address</label>
            <input name="address" id="address" type="text" defaultValue={Address} />
            <label htmlFor="description">Description</label>
            <input name="description" id="description" type="text" defaultValue={Description} />
            <label htmlFor="email">Email</label>
            <input name="email" id="email" type="email" defaultValue={Email} />
            <label htmlFor="phone">Phone</label>
            <input name="phone" id="phone" type="tel" defaultValue={Phone} />
            <button>Update</button>
          </form>
        </div>
      </div>
    );
  }
}
