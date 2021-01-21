import React from 'react';
import MenuItem from '../components/MenuItem';
import Navbar from '../components/NavBar';

export default class MenuRecommendation extends React.Component {
  constructor() {
    super();
    this.state = { item: {} };
  }

  componentDidMount = async () => {
    this.getRecommendation();
  }

  getRecommendation = () => {
    fetch('http://localhost:8000/recommendation')
      .then((res) => res.json())
      .then((data) => {
        this.setState({ item: data.data[0] });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  refreshPage = () => {
    this.getRecommendation();
  }

  render() {
    return (
      <div>
        {this.props.isAuth === true ? (
          <div>
            <Navbar />
            <div className="main">
              <h1>Your surprise menu item</h1>
              <MenuItem item={this.state.item} />
              <button onClick={this.refreshPage}>Get a new surprise</button>
            </div>
          </div>
        )
          : (<div><h2>Not authorized</h2></div>)}
      </div>
    );
  }
}
