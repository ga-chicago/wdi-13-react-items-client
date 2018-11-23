import React, { Component } from 'react';
import apiUrl from './apiUrl';

class LoginRegister extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      password: '',
      which: "login"
    }
  }
  handleChange = (e) => {
    this.setState({
      // this is called computed properties sytax
      [e.currentTarget.name]: e.currentTarget.value
    })
  }
  handleSubmit = async (e) => {
    e.preventDefault();
    console.log(`You are trying to ${this.state.which}`);
    const response = await fetch(`${apiUrl}/api/user/${this.state.which}`, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      }),
      headers: { // this is how you set HTTP headers in fetch
        'Content-Type': 'application/json'
      }
    })
    const parsed = await response.json(); // See fetch API (MDN) for explanation of why this is necessary
    console.log("here is auth response from handleSubmit in LoginRegister");
    console.log(parsed);
    if(parsed.status === 200) {
      this.props.logIn(parsed.logged_in_as)
    }
  }
  toggle = () => {
    if(this.state.which==="login") {
      this.setState({
        which: "register"
      })
    } else {
      this.setState({
        which: "login"
      })
    }
  }
  render() {
    return(
      <div>
        <h1>{ this.state.which === "login" ? "Log in here" : "Register here" }</h1>
        <form onSubmit={this.handleSubmit} >
          <input 
            type="text"
            name="username"
            placeholder="username"
            value={this.state.username}
            onChange={this.handleChange}
          />
          <br />
          <input
            type="password"
            name="password"
            placeholder="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <br />
          <button>
            { this.state.which === "login" ? "Log in" : "Register" }
          </button>
          <br />
          <small>
            { this.state.which === "login" ? "Need an account? Sign up " : "Already have an account? Log in " }
            <span className="fake-link" onClick={this.toggle}>here</span>!
          </small>
        </form>
      </div>
    )
  }
}

export default LoginRegister;