import React, { Component } from 'react'
import './App.css'
import 'shoelace-css/dist/shoelace.css'
import Dashboard from './Dashboard'
import Login from './Login'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <Dashboard />
        {/* <Login /> */}
        {/* hello */}
      </div>
    )
  }
}

export default App
