import React, { Component } from 'react';

class List extends Component {
  constructor() {
    super()
    this.state = {
      items: [],
      contentToAdd: ''
    }
  }
  async getItems() {
    const response = await fetch('http://localhost:9292/api/items', {
      credentials: 'include'
    })
    const parsed = await response.json();
    // console.log(parsed.items);
    this.setState({
      items: parsed.items
    })
  }
  componentDidMount() { 
    console.log("componentDidMount List");
    this.getItems();
  }
  handleChange = (e) => {
    this.setState({
      contentToAdd: e.currentTarget.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.addItem();
  }
  async addItem() {
    // take what's in state
    // add it with fetch
    const response = await fetch('http://localhost:9292/api/items', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({
        content: this.state.contentToAdd
      }),
      headers: { // this is how you set HTTP headers in fetch
        'Content-Type': 'application/json'
      }
    })
    const parsed = await response.json();
    // if it works
    if(parsed.status === 200) {
      // clear out contentToAdd in state
      this.setState({
        contentToAdd: ''
      })
      this.getItems();
    }
  }
  render(){
    const items = this.state.items.map((item, i) => {
      return <li key={i}>{item.content}</li>
    })
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input 
            type="text" 
            name="content" 
            value={this.state.contentToAdd} 
            placeholder="enter yr item ASAP"
            onChange={this.handleChange}
          />
          <button>Add it!</button>
        </form>
        <h2>Item List</h2>
        <ul>{items}</ul>
      </div>
    )
  }

}

export default List;