import React from 'react'
import './App.css'
import Card from './Card.js'
class App extends React.Component {
  render() {
    return (
      <div className = "app">
        <img src = "branding.svg" width = "200px"></img><br></br><br></br>
        <Card />
      </div>
    )
  }
}

export default App;
