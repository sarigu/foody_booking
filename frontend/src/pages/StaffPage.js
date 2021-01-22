import React from 'react';
import Navbar from '../components/NavBar';
import Staff from '../components/Staff';

export default class Menu extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount = () => {
    fetch('http://localhost:8000/staff')
      .then((res) => res.json())
      .then((data) => {
        this.setState({ staff: data.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleNewStaff = async (e) => {
    e.preventDefault();
    console.log(e.target);
    const {
      email, password, firstName, lastName,
    } = e.target;

    await fetch('http://localhost:8000/auth/create_staff_account', {
      method: 'POST',
      body: JSON.stringify({
        email: email.value,
        password: password.value,
        firstName: firstName.value,
        lastName: lastName.value,
      }),
      headers: { 'Content-Type': 'application/json' },
    }).then((response) => (response.status === 200 ? window.location = '/staff' : console.log('error')));
  }

  render() {
    return (
      <div>
        {this.props.isAuth === true && this.props.usertype === 'restaurant' ? (
          <div>
            <Navbar />
            <div className="main">
              <h1>See current staff &#127882;</h1>
              {this.state.staff ? this.state.staff.map((item, index) => (
                <Staff key={`staff${index}`} item={item} />
              )) : (<div> No Staff </div>)}
              <div>
                <h1>Add staff</h1>
                <form onSubmit={this.handleNewStaff}>
                  <label htmlFor="firstName">First Name</label>
                  <input required type="text" id="firstName" name="firstName" placeholder="first name" />
                  <label htmlFor="lastName">Last Name</label>
                  <input required type="text" id="lastName" name="lastName" placeholder="last name" />
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" name="email" placeholder="email" />
                  <label htmlFor="password">Temporary Password</label>
                  <input type="text" id="password" name="password" placeholder="temporary password" />
                  <button type="submit">Update</button>
                </form>
              </div>
            </div>
          </div>
        )
          : (<div><h2>Not authorized</h2></div>)}
      </div>
    );
  }
}
