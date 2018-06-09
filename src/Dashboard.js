import React, { Component } from 'react'
import './App.css'
import 'shoelace-css/dist/shoelace.css'
import Question from './Question'
import request from 'superagent'
import AskQuestionForm from './AskQuestionForm'
import Login from './Login'
import Register from './Register'

class Dashboard extends Component {
  constructor () {
    super()
    this.state = {
      questions: [],
      askQuestion: false,
      searchValue: '',
      loginClicked: false,
      registerClicked: false
    }

    this.askQuestionForm = this.askQuestionForm.bind(this)
    this.getQuestions = this.getQuestions.bind(this)
    this.submitOrCancel = this.submitOrCancel.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.clickLogin = this.clickLogin.bind(this)
    this.cancelLogin = this.cancelLogin.bind(this)
    this.clickRegister = this.clickRegister.bind(this)
    this.cancelRegister = this.cancelRegister.bind(this)
  }

  submitOrCancel () {
    this.setState({
      askQuestion: false
    })
  }

  clickLogin () {
    this.setState({
      loginClicked: true
    })
  }

  cancelLogin () {
    this.setState({
      loginClicked: false
    })
  }

  clickRegister () {
    this.setState({
      registerClicked: true
    })
  }

  cancelRegister () {
    this.setState({
      registerClicked: false
    })
  }

  componentDidMount () {
    request
      .get('https://whispering-stream-62515.herokuapp.com/api/v1/questions')
      .then(res => {
        console.log(res)
        this.setState({
          questions: res.body
        })
      })
  }

  handleSearch (event) {
    this.setState({
      searchValue: event.target.value
    })
  }

  askQuestionForm () {
    this.setState({
      askQuestion: true
    })
  }

  getQuestions () {
    request
      .get('http://localhost:8000/Questions')
      .then(res => {
        console.log(res)
        this.setState({
          questions: res.body
        })
      })
  }

  render () {
    if (this.state.searchValue) {
      const filteredArray = this.state.questions.filter(question => question.title.toLowerCase().includes(this.state.searchValue.toLowerCase()))
      return (
        <div>
          <header className='header'>
            <h1 className='title'>code{'{interview}'}</h1>
            <button className='login' onClick={this.clickLogin}>Login</button>
            <button onClick={this.clickRegister}>Register</button>
          </header>
          <div>
            <div className='input-group'>
              <input type='text' placeholder='search...' onChange={this.handleSearch} />
            </div>
            <button onClick={this.clickLogin}>Login to ask a question</button>
            <div className='questions-container'>
              {filteredArray.map((question, idx) => (
                <div key={idx}>
                  <Question question={question} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    } else if (this.state.loginClicked) {
      return (
        <Login cancel={this.cancelLogin} updateToken={this.props.updateToken} />
      )
    } else if (this.state.registerClicked) {
      return (
        <Register cancel={this.cancelRegister} updateToken={this.props.updateToken} sendToLogin={this.clickLogin} />
      )
    } else {
      return (
        <div>
          <header className='header'>
            <h1 className='title'>code{'{interview}'}</h1>
            <button className='login' onClick={this.clickLogin}>Login</button>
            <button onClick={this.clickRegister}>Register</button>
          </header>
          <div className='Dashboard'>
            <div className='input-group'>
              <span class='input-addon input-addon-xl'>Q:</span>
              <input type='text' className='searchBar input-xl' placeholder='search...' onChange={this.handleSearch} />
            </div>
            <div className='questions-container'>
              {this.state.questions.map((question, idx) => (
                <div key={idx}>
                  <Question question={question} />
                </div>
              ))}
            </div>
            <button onClick={this.clickLogin}>Login to ask a question</button>
          </div>
        </div>
      )
    }
  }
}

export default Dashboard
