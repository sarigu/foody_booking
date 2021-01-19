import React from 'react';
import Navbar from '../components/NavBar';
import PartyForm from '../components/PartyForm';
import Table from '../components/Table';

export default class TablesPage extends React.Component {
  constructor() {
    super();
    this.state = { tables: [] };
  }

    componentDidMount = () => {
      // const timeslotID = localStorage.getItem('timeslotID');
      const date = localStorage.getItem('date');

      this.setState({ date: date });
    }

    handleGroupSize = async (e) => {
      e.preventDefault();
      const groupsize = e.target.groupsize.value;
      this.setState({ groupsize: groupsize, showAvailableTables: true });

      fetch(`http://localhost:8000/tables/${groupsize}`)
        .then((res) => res.json())
        .then((data) => {
          this.setState({ tables: data.data });
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
            <PartyForm onSubmit={this.handleGroupSize} />
            <div>
              {this.state.showAvailableTables === true
                ? (
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
                )
                : (<div />)}
            </div>
          </div>
        </div>
      );
    }
}
