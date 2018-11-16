import React, { Component } from 'react';
import './App.css';
import List from './List';
import LoginRegister from './LoginRegister'

class App extends Component {
  constructor() {
    super()
    this.state = {
      loggedIn: false
    }
  }
  render() {
    return (
      <div>
        { this.state.loggedIn ? <List /> : <LoginRegister /> }
      </div>
    );
  }
}

export default App;
