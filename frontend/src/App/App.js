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

class App extends React.Component {
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
                <Index />
              </Route>
              <Route path="/menu" exact>
                <Menu />
              </Route>
              <Route path="/recommendation" exact>
                <MenuRecommendation />
              </Route>
              <Route path="/editmenu" exact>
                <MenuEditPage />
              </Route>
              <Route path="/restaurantdetails" exact>
                <RestaurantDetails />
              </Route>
              <Route path="/updatedetails" exact>
                <RestaurantForm />
              </Route>
              <Route path="/booking/time" exact>
                <TimeslotsPage />
              </Route>
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
