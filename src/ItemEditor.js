import React, { Component } from 'react';

class ItemEditor extends Component {

  constructor() {
    super()

    this.state = {
      userInput: ''
    }
  }

  componentDidMount() { console.log("cdm ItemEditor");
    this.setState({
      userInput: this.props.text
    })
  }

  handleChange = (e) => {
    this.setState({
      userInput: e.currentTarget.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    // console.log("you tried to edit, this.state is ", this.state);
    // call a function passed in via props
    // from List, which is the smart component that is managing
    // our data
    this.props.processInput(this.props.itemId, this.state.userInput)
  }

  render() {  console.log("render in ItemEditor");
    return(
      <form onSubmit={this.handleSubmit} >
        <input
          size="40"
          type="text"
          name="userInput"
          value={this.state.userInput}
          onChange={this.handleChange}
        />
        <button>Update!</button>
      </form>
    )
  }
}

export default ItemEditor;
