import './App.css';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Menu from '../pages/Menu';
import MenuRecommendation from '../pages/MenuRecommendation';
import RestaurantDetails from '../pages/RestaurantDetails';
import RestaurantForm from '../components/RestaurantForm';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import Index from '../pages/Index';
import MenuEditPage from '../pages/MenuEditPage';
import TimeslotsPage from '../pages/TimeslotsPage';
import TablesPage from '../pages/TablesPage';
import DatePage from '../pages/DatePage';
import GroupsizePage from '../pages/GroupsizePage';
import ConfirmBookingPage from '../pages/ConfirmBookingPage';
import BookingOverview from '../pages/BookingOverview';
import Contact from '../pages/Contact';
import StaffPage from '../pages/StaffPage';
import CancelBooking from '../pages/CancelBooking';
import ConfirmByRestaurant from '../pages/ConfirmByRestaurant';
import AddTables from '../pages/AddTables';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      auth: false,
    };
  }

  componentDidMount = () => {
    fetch('http://localhost:8000/auth/is_auth')
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        localStorage.setItem('userEmail', data.userEmail);
        localStorage.setItem('usertype', data.usertype);
        this.setState({ auth: data.auth, usertype: data.usertype });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="app">
        <Router>
          <div>
            <Switch>
              <Route path="/" exact>
                <div className="flex">
                  <h1 className="welcome-heading">Hello You</h1>
                  <span className="emojis">&#128522;</span>
                  <span className="emojis">&#9995;</span>
                </div>
                <Login />
              </Route>
              <Route path="/signup" exact>
                <SignUp />
              </Route>
              <Route path="/index" exact>
                <Index isAuth={this.state.auth} usertype={this.state.usertype} />
              </Route>
              <Route path="/menu" exact>
                <Menu isAuth={this.state.auth} usertype={this.state.usertype} />
              </Route>
              <Route path="/recommendation" exact>
                <MenuRecommendation isAuth={this.state.auth} usertype={this.state.usertype} />
              </Route>
              <Route path="/editmenu" exact>
                <MenuEditPage isAuth={this.state.auth} usertype={this.state.usertype} />
              </Route>
              <Route path="/restaurantdetails" exact>
                <RestaurantDetails isAuth={this.state.auth} usertype={this.state.usertype} />
              </Route>
              <Route path="/updatedetails" exact>
                <RestaurantForm isAuth={this.state.auth} usertype={this.state.usertype} />
              </Route>
              <Route path="/booking/date" exact>
                <DatePage isAuth={this.state.auth} usertype={this.state.usertype} />
              </Route>
              <Route path="/booking/time" exact>
                <TimeslotsPage />
              </Route>
              <Route path="/booking/groupsize" exact>
                <GroupsizePage />
              </Route>
              <Route path="/booking/tables" exact>
                <TablesPage isAuth={this.state.auth} usertype={this.state.usertype} />
              </Route>
              <Route path="/booking/confirm" exact>
                <ConfirmBookingPage isAuth={this.state.auth} usertype={this.state.usertype} />
              </Route>
              <Route path="/booking/restaurant_confirm" exact>
                <ConfirmByRestaurant isAuth={this.state.auth} usertype={this.state.usertype} />
              </Route>
              <Route path="/overview" exact>
                <BookingOverview isAuth={this.state.auth} usertype={this.state.usertype} />
              </Route>
              <Route path="/contact" exact>
                <Contact isAuth={this.state.auth} usertype={this.state.usertype} />
              </Route>
              <Route path="/staff" exact>
                <StaffPage isAuth={this.state.auth} usertype={this.state.usertype} />
              </Route>
              <Route path="/cancel_booking" exact>
                <CancelBooking isAuth={this.state.auth} usertype={this.state.usertype} />
              </Route>
              <Route path="/edit_tables" exact>
                <AddTables isAuth={this.state.auth} usertype={this.state.usertype} />
              </Route>
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
