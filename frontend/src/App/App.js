
import React from 'react';
import UserStore from '../stores/UserStore';
import LoginForm from '../components/LoginForm';
import InputField from '../components/InputField';
import SubmitButton from '../components/SubmitButton';

class App extends React.Component {

  async componentDidMount() {

    try {

        let res = await fetch('./isLoggedIn',  {
            method: 'post',
            headers: {
              'Accept': 'application/json',
              'Content-type': 'application/json'
            }

        })

    }

    catch(e) {

    }
    
  }

  render() {
  return (
    <div className="app">
      <h1>Hello</h1>
    
    </div>
  );
}}

export default App;
