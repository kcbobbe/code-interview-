import React, { Component } from 'react'
import './App.css'
import 'shoelace-css/dist/shoelace.css'
import Dashboard from './Dashboard'
import Login from './Login'
import DashboardLoggedIn from './DashboardLoggedIn';

class App extends Component {
  constructor () {
    super()
    this.state = {
      loggedIn: false
    }

    this.checkLogin = this.checkLogin.bind(this)
  }

  checkLogin () {
    this.setState({
      loggedIn: true
    })
  }

  render () {
    return (
      <div className='App'>
        <div className='container'>
          {this.state.loggedIn ? (
            <DashboardLoggedIn />
          ) : (
            <Dashboard loggedIn={this.checkLogin} />
          )}
        </div>
      </div>
    )
  }
}

export default App
