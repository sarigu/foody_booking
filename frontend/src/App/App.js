import './App.css';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Menu from '../pages/menu';
import MenuRecommendation from '../pages/menuRecommendation';

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
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
