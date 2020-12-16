import './App.css';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Menu from '../pages/menu';
import MenuRecommendation from '../pages/menuRecommendation';
import RestaurantDetails from '../pages/restaurantDetails';
import RestaurantForm from '../components/RestaurantForm'

class App extends React.Component {

  async componentDidMount() {

    try {

      let res = await fetch('./isLoggedIn', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        }

      })

    }

    catch (e) {
      console.log(e)
    }

  }

  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route path="/" exact>
              <h1>Hello</h1>
            </Route>
            <Route path="/menu" exact>
              <Menu />
            </Route>
            <Route path="/recommendation" exact>
              <MenuRecommendation />
            </Route>
            <Route path="/restaurantdetails" exact>
              <RestaurantDetails />
            </Route>
            <Route path="/updatedetails" exact>
              <RestaurantForm />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
