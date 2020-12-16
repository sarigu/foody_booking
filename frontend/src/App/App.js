import './App.css';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Menu from '../pages/menu';
import UserStore from '../stores/UserStore';
import LoginForm from '../components/LoginForm';
import InputField from '../components/InputField';
import SubmitButton from '../components/SubmitButton';

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
            </Route>
            <Route path="/menu" exact>
              <Menu />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
