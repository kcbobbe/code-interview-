import React, { Component } from 'react'
import './App.css'
import 'shoelace-css/dist/shoelace.css'
import Question from './Question'
import request from 'superagent'
import AskQuestionForm from './AskQuestionForm'
import Login from './Login'

class Dashboard extends Component {
  constructor () {
    super()
    this.state = {
      questions: [],
      askQuestion: false,
      searchValue: '',
      loginClicked: false
    }

    this.askQuestionForm = this.askQuestionForm.bind(this)
    this.getQuestions = this.getQuestions.bind(this)
    this.submitOrCancel = this.submitOrCancel.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.clickLogin = this.clickLogin.bind(this)
    this.cancelLogin = this.cancelLogin.bind(this)
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

  componentDidMount () {
    request
      .get('http://localhost:8000/Questions')
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
            <h1 className='title'>Interview Questions</h1>
            <button className='login' onClick={this.clickLogin}>Login</button>
          </header>
          <div>
            <div className='input-group'>
              <input type='text' placeholder='search...' onChange={this.handleSearch} />
            </div>
            <button onClick={this.clickLogin}>Login to ask a question</button>
            {filteredArray.map((question, idx) => (
              <div key={idx}>
                <Question question={question} />
              </div>
            ))}
          </div>
        </div>
      )
    } else if (this.state.loginClicked) {
      return (
        <Login cancel={this.cancelLogin} login={this.props.loggedIn} />
      )
    } else {
      return (
        <div>
          <header className='header'>
            <h1 className='title'>Interview Questions</h1>
            <button className='login' onClick={this.clickLogin}>Login</button>
          </header>
          <div className='Dashboard'>
            <div className='input-group'>
              <input type='text' placeholder='search...' onChange={this.handleSearch} />
            </div>
            <button onClick={this.clickLogin}>Login to ask a question</button>
            <div className='questions-container'>
              {this.state.questions.map((question, idx) => (
                <div key={idx}>
                  <Question question={question} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    }
  }
}

export default Dashboard
