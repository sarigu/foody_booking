import React from 'react';
import Navbar from '../components/NavBar';

export default class RestaurantDetails extends React.Component {
  constructor() {
    super();
    this.state = { restaurantData: {} };
  }

  componentDidMount = async () => {
    fetch('http://localhost:8000/restaurantdetails')
      .then((res) => res.json())
      .then((data) => {
        this.setState({ restaurantData: data.data[0] });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const {
      Name, Description, Address, Email, Phone,
    } = this.state.restaurantData;

    return (
      <div>
        {this.props.isAuth === true ? (
          <div>
            <Navbar />
            <div className="main">
              <h1>Contact</h1>
              <div>
                <div>
                  <span className="boldText">Name: </span>
                  {Name}
                </div>
                <br />
                <div>
                  <span className="boldText">Address: </span>
                  {Address}
                </div>
                <br />
                <div>
                  <span className="boldText">Description: </span>
                  {Description}
                </div>
                <br />
                <div>
                  <span className="boldText">Email: </span>
                  {Email}
                </div>
                <br />
                <div>
                  <span className="boldText">Phone: </span>
                  {Phone}
                </div>
              </div>
            </div>
          </div>
        )
          : (<div><h2>Not authorized</h2></div>)}
      </div>
    );
  }
}
