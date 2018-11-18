import React, { Component } from 'react';

class List extends Component {
  constructor() {
    super()
    this.state = {
      items: []
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
    this.getItems();
  }
  render(){
    const items = this.state.items.map((item, i) => {
      return <li key={i}>{item.content}</li>
    })
    return (
      <div>
        <h2>Item List</h2>
        <ul>{items}</ul>
      </div>
    )
  }

}

export default List;