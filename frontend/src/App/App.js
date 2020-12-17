import './App.css';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Menu from '../pages/menu';
import MenuRecommendation from '../pages/menuRecommendation';
import RestaurantDetails from '../pages/restaurantDetails';
import RestaurantForm from '../components/RestaurantForm';
import Login from '../pages/login';
import SignUp from '../pages/SignUp';
import Index from '../pages/index'

class App extends React.Component {

  constructor() {
    super();

    this.state = {
      isAuthorized: "false",
    }
  }


  componentDidMount = async () => {
    try {
      await fetch("http://localhost:8000/getsession", {
      }).then(response =>
        response.status === 200 ? this.setState({ isAuthorized: "true" }) : this.setState({ isAuthorized: "false" })
      );
      console.log(this.state.isAuthorized)
    } catch (e) {
      console.log(e);
    }
  }


  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route path="/" exact>
              <h1>Hello</h1>
              <Login />
            </Route>
            <Route path="/signup" exact>
              <SignUp />
            </Route>
            <Route path="/index" exact>
              <Index isAuth={this.state.isAuthorized} />
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
