import React, { Component } from 'react'
import './App.css'
import 'shoelace-css/dist/shoelace.css'
import Dashboard from './Dashboard'
import Login from './Login'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <header className='header'>
          <h1 className='title'>Interview Questions</h1>
          <button className='login'>Login</button>
        </header>
        <div className='container'>
          <Dashboard />
        </div>
      </div>
    )
  }
}

export default App
