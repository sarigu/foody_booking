import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/NavBar';
import Table from '../components/Table';

export default class TablesPage extends React.Component {
  constructor() {
    super();
    this.state = {};
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
        if (!data.message) {
          this.setState({
            tables: data, groupsize: groupsize, date: date, startTime: startTime, endTime: endTime,
          });
        } else {
          this.setState({
            groupsize: groupsize, date: date, startTime: startTime, endTime: endTime,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handlePickedTable = (e) => {
    const tableID = e.target.id;
    localStorage.setItem('tableID', tableID);
    const usertype = localStorage.getItem('usertype');
    if (usertype === 'user') {
      window.location = '/booking/confirm';
    } else {
      window.location = '/booking/restaurant_add';
    }
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
          </div>
          <div>
            <h2>Available Tables</h2>
            <div><span className="boldText">For</span> {this.state.groupsize} people</div>
            <div><span className="boldText">On</span> {this.state.date} </div>
            <div><span className="boldText">Between</span> {this.state.startTime} <span className="boldText">and</span> {this.state.endTime}  </div>
            <div>
              {this.state.tables ? this.state.tables.map((table, index) => (
                <div>
                  <Table key={`table${index}`} item={table} />
                  <button id={table.TableID} onClick={this.handlePickedTable}>Pick</button>
                </div>
              )) : (<div> No Available Tables </div>)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
