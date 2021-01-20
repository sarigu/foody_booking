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
    const date = localStorage.getItem('date');
    const timeslotID = localStorage.getItem('timeslotID');
    const groupsize = localStorage.getItem('groupsize');
    const startTime = localStorage.getItem('timeslotStart');
    const endTime = localStorage.getItem('timeslotEnd');

    fetch(`http://localhost:8000/tables/${groupsize}/${timeslotID}/${date}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.setState({
          tables: data, groupsize: groupsize, date: date, startTime: startTime, endTime: endTime,
        });
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
            <div>Between {this.state.startTime} and {this.state.endTime}  </div>
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
