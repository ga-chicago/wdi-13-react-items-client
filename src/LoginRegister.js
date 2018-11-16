import React, { Component } from 'react';
import './LoginRegister.css'


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