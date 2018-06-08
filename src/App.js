import React, { Component } from 'react'
import './App.css'
import 'shoelace-css/dist/shoelace.css'
import Dashboard from './Dashboard'
import Login from './Login'
import DashboardLoggedIn from './DashboardLoggedIn'

class App extends Component {
  constructor () {
    super()
    this.state = {
      token: localStorage.token
    }

    this.updateToken = this.updateToken.bind(this)
  }

  updateToken () {
    this.setState({
      token: localStorage.token
    })
  }

  render () {
    return (
      <div className='App'>
        <div className='container'>
          {this.state.token ? (
            <DashboardLoggedIn />
          ) : (
            <Dashboard updateToken={this.updateToken} />
          )}
        </div>
      </div>
    )
  }
}

export default App
