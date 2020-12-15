import React from 'react';
import './App.css';

import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'


class App extends React.Component{

  state = {
    apiResponse: [],
    display: false
  }

  componentDidMount(){
    fetch('http://localhost:3000/toys')
    .then(r => r.json())
    .then(data => this.setState({apiResponse: data}))
  }

  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }

  deleteToy = (id) => {
    fetch(`http://localhost:3000/toys/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json"
      }
    })
    .then(r => r.json())
    .then(() => {
      const newArray = this.state.apiResponse.filter(toy => toy.id !== id)
      this.setState({apiResponse: newArray})
    })
  }

  addNewToyHandler = (toyObj) => {
    toyObj.likes = 0
    fetch('http://localhost:3000/toys', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json"
      },
      body: JSON.stringify(toyObj)
    })
    .then(r => r.json())
    .then(newToyObj => this.setState({apiResponse: [...this.state.apiResponse, newToyObj]}))
  }

  updateLike = (id) => {
    let objLikes = this.state.apiResponse.find(toy => toy.id === id).likes
    console.log(objLikes)
    fetch(`http://localhost:3000/toys/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json"
      },
      body: JSON.stringify({likes: objLikes + 1})
    })
    .then(r => r.json())
    .then(newObj => {
      const newArray = [...this.state.apiResponse]
      const idx = this.state.apiResponse.findIndex(toy => toy.id === newObj.id)
      newArray[idx] = newObj 
      this.setState({apiResponse: newArray}) 
    })
  }

  render(){
    return (
      <>
        <Header/>
        { this.state.display
            ?
          <ToyForm addNewToy={this.addNewToyHandler} />
            :
          null
        }
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer updateLike={this.updateLike} deleteToy={this.deleteToy} toyArray={this.state.apiResponse}/>
      </>
    );
  }

}

export default App;
