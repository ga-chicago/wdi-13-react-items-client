import React, { Component } from 'react';
import ItemEditor from './ItemEditor'
import apiUrl from './apiUrl'

class List extends Component {
  constructor() {
    super()
    this.state = {
      items: [],
      contentToAdd: '',
      editingItemId: -1
    }
  }
  async getItems() {
    const response = await fetch(`${apiUrl}/api/items`, {
      credentials: 'include'
    })
    const parsed = await response.json();

    // sort the items by id
    // const sortedItems = parsed.items.sort((a, b) => {
    // 
    //   // return a neg number if a should come before b
    //   if(a.id < b.id) {
    //     return -1
    //   }
    //   // return 0 if it doesn't matter

    //   // return a postive number if b should come before a
    //   else if (a.id > b.id) {
    //     return 1
    //   }

    // });

    // const sortedItems = parsed.items.sort((a, b) => {
    
    //   // return a neg number if a should come before b
    //   if(a.id < b.id) { // the expression b-a will always be negative
    //     return -1
    //   }
    //   // return 0 if it doesn't matter -- it will always matter, because 
    //   // IDS from our DB are unique and serial

    //   // return a postive number if b should come before a
    //   else if (a.id > b.id) { // the expression b-a will always be postive
    //     return 1
    //   }

    // });

    const sortedItems = parsed.items.sort((a, b) => b.id - a.id);

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
    const response = await fetch(`${apiUrl}/api/items`, {
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

  edit = (e) => {
    console.log("edit");
    const idToEdit = e.currentTarget.dataset.itemId;
    this.setState({
      editingItemId: idToEdit
    })
  }

  stopEditing = () => {
    this.setState({
      editingItemId: -1
    })
  }

  updateItem = async (id, text) => {
    console.log(`fetch call to change item ${id} to ${text}`);
    
    const response = await fetch(`${apiUrl}/api/items/${id}`, {
      method: 'PUT',
      credentials: 'include',
      body: JSON.stringify({
        content: text
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const parsed = await response.json()
    console.log(parsed);

    if(parsed.status==200) {
      // get rid of editor
      this.stopEditing();
      // changed the value in state -- 
      // in your apps, especially if they handle large amounts of data, 
      // you could make an argument that you should find it and edit 
      // it in the array in state
      // however, to be lazy, i'm just gonna call my method that shows the 
      // current Items list
      this.getItems();
    }

  }

  delete = async (e) => {
    const idToDelete = e.currentTarget.dataset.itemId;
    console.log("you are trying to delete ", idToDelete);
    const response = await fetch(`${apiUrl}/api/items/${idToDelete}`, {
      method: 'DELETE',
      credentials: 'include'
    })
    const parsed = await response.json();
    if(parseInt(parsed.status) === 200) {
      // this.getItems();

      // or you could physically remove it from the array
      // and avoid making another request to your API

      const state = this.state;

      const index = state.items.findIndex((elem) => {
        if(parseInt(elem.id)===parseInt(idToDelete)) {
          return true
        }
        else return false
      })

      // const index = state.items.findIndex((elem) => parseInt(elem.id) === parseInt(idToDelete))
      state.items.splice(index, 1)
      this.setState(state);
    }
  }

  render(){
    const items = this.state.items.map((item, i) => {
      if (item.id.toString() === this.state.editingItemId.toString()) {
        return(
          <li key={i}>
            <ItemEditor 
              processInput={this.updateItem}
              itemId={item.id}
              text={item.content}
            />
          </li>
        )
      }
      
      else {      
        return (
          <li key={i}>
            {item.content}
            <span 
              className="fake-link"
              data-item-id={item.id}
              onClick={this.edit}
            >
              (edit)
            </span>
            <span 
              className="fake-link-red"
              data-item-id={item.id}
              onClick={this.delete}
            >
              (delete)
            </span>
          </li>
        )
      }

    }) // .map

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