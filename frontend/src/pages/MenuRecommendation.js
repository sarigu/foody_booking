import React from 'react';
import MenuItem from '../components/MenuItem';
import Navbar from '../components/NavBar';

export default class MenuRecommendation extends React.Component {
  constructor() {
    super();
    this.state = { item: {} };
  }

  componentDidMount = async () => {
    try {
      const response = await fetch('http://localhost:8000/recommendation');
      const data = await response.json();
      this.setState({ item: data.data[0] });
    } catch (e) {
      console.log(e);
    }
  }

  refreshPage = () => {
    window.location.reload();
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="main">
          <h1>Your surprise menu item</h1>
          <MenuItem item={this.state.item} />
          <button onClick={this.refreshPage}>Get a new surprise</button>
        </div>
      </div>
    );
  }
}
