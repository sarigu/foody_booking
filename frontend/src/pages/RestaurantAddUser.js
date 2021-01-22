import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/NavBar';

export default class ConfirmByRestaurant extends React.Component {
  handleAddedData = (e) => {
    e.preventDefault();
    const {
      email, firstName, lastName,
    } = e.target;

    fetch('http://localhost:8000/auth/create_account', {
      method: 'POST',
      body: JSON.stringify({
        email: email.value,
        firstName: firstName.value,
        lastName: lastName.value,
      }),
      headers: { 'Content-Type': 'application/json' },
    }).then((res) => res.json())
      .then((data) => {
        console.log(data);
        localStorage.setItem('customerid', data.userid);
        localStorage.setItem('customeremail', email);
        localStorage.setItem('customername', firstName.value);
        window.location = '/booking/restaurant_confirm';
      });
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="main">
          <div>
            <Link className="bar-elem" to="/booking/date">Date</Link>
            <Link className="bar-elem" to="/booking/time">Timeslot</Link>
            <Link className="bar-elem" to="/booking/groupsize">Group Size</Link>
            <Link className="bar-elem" to="/booking/tables">Tables</Link>
          </div>
          <div>
            <h2>Add the customer info </h2>
            <div>
              <form onSubmit={this.handleAddedData}>
                <label htmlFor="firstName">First name</label>
                <input type="text" id="firstName" name="firstName" placeholder="first name" />
                <label htmlFor="lastName">Last Name</label>
                <input type="text" id="lastName" name="lastName" placeholder="last name" />
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" placeholder="email" />
                <button type="submit">Update</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
