import React from 'react';
import Navbar from '../components/NavBar';
import Table from '../components/Table';
import AddTableForm from '../components/AddTableForm';

export default class AddTables extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

    componentDidMount = async () => {
      fetch('http://localhost:8000/timeslots')
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          this.setState({ timeslots: data });
        })
        .catch((err) => {
          console.log(err);
        });
    }

    handleDate = (e) => {
      e.preventDefault();
      const date = e.target.date.value;
      const timeslotID = e.target.timeslot.value;
      const groupsize = 0;
      this.getTables(date, timeslotID, groupsize);
    }

    getTables = (date, timeslotID, groupsize) => {
      fetch(`http://localhost:8000/tables/${groupsize}/${timeslotID}/${date}`)
        .then((res) => res.json())
        .then((data) => {
          if (!data.message) {
            this.setState({
              tables: data, date: date, timeslotID: timeslotID,
            });
          } else {
            this.setState({
              tables: data, date: date, timeslotID: timeslotID,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }

    handleAddedTable = async (e) => {
      console.log('add table');
      e.preventDefault();
      const { name, capacity } = e.target;

      await fetch('http://localhost:8000/add_table', {
        method: 'POST',
        body: JSON.stringify({
          name: name.value,
          capacity: capacity.value,
          date: this.state.date,
          timeslotID: this.state.timeslotID,
        }),
        headers: { 'Content-Type': 'application/json' },
      }).then((response) => (response.status === 200 ? this.getTables(this.state.date, this.state.timeslotID, capacity.value) : console.log('err')));
    }

    render() {
      return (
        <div>
          {this.props.isAuth === true && this.props.usertype === 'restaurant' ? (
            <div>
              <Navbar />
              <div className="main">
                <h2>Choose a date</h2>
                <form onSubmit={this.handleDate}>
                  <label htmlFor="text">Date</label>
                  <input type="date" id="date" name="date" placeholder="yyyy-mm-dd" />
                  <label htmlFor="timeslot">Timeslot:</label>
                  <select name="timeslot" id="timeslot">
                    {this.state.timeslots && this.state.timeslots.map((timeslot, index) => (
                      <option value={timeslot.TimeSlotID}>{timeslot.StartTime}</option>
                    ))}
                  </select>
                  <button type="submit">Go</button>
                </form>
                <h2>Available Tables</h2>
                <div>
                  {this.state.tables && this.state.tables.map((table, index) => (
                    <Table key={`table${index}`} item={table} />
                  ))}
                </div>
                <div>
                  <h2>Add new tables for {this.state.date}</h2>
                  <AddTableForm onAddTable={this.handleAddedTable} />
                </div>
              </div>
            </div>
          )
            : (<div><h2>Not authorized</h2></div>)}
        </div>
      );
    }
}
