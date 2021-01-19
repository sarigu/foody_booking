import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/NavBar';
import Table from '../components/Table';

export default class TablesPage extends React.Component {
  constructor() {
    super();
    this.state = { tables: [] };
  }

  componentDidMount = async () => {
    // const timeslotID = localStorage.getItem('timeslotID');
    const date = localStorage.getItem('date');
    const groupsize = localStorage.getItem('groupsize');

    fetch(`http://localhost:8000/tables/${groupsize}`)
      .then((res) => res.json())
      .then((data) => {
        this.setState({ tables: data.data, groupsize: groupsize, date: date });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="main">
          <div>
            <Link to="/booking/date">Date</Link>
            <Link to="/booking/time">Timeslot</Link>
            <Link to="/booking/groupsize">Group Size</Link>
          </div>
          <div>
            <h2>Available Tables</h2>
            <div>For {this.state.groupsize} people</div>
            <div>On  {this.state.date} </div>
            <div>Between  and  </div>
            <div>
              {this.state.tables && this.state.tables.map((table, index) => (
                <Table key={`table${index}`} item={table} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
