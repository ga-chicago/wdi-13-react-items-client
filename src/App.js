import React, { Component } from 'react';
import './App.css';
import List from './List';
import LoginRegister from './LoginRegister'

class App extends Component {
  constructor() {
    super()
    this.state = {
      loggedIn: false,
      username: ''
    }
  }

  logIn = (username) => {
    this.setState({
      loggedIn: true,
      username: username
    })
  }

  render() {
    return (
      <div>
        { this.state.loggedIn ? <List /> : <LoginRegister logIn={this.logIn} /> }
      </div>
    );
  }
}

export default App;
