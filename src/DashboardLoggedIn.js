import React, { Component } from 'react'
import './App.css'
import 'shoelace-css/dist/shoelace.css'
import Question from './Question'
import request from 'superagent'
import AskQuestionForm from './AskQuestionForm'

class DashboardLoggedIn extends Component {
  constructor () {
    super()
    this.state = {
      questions: [],
      askQuestion: false,
      searchValue: ''
    }

    this.askQuestionForm = this.askQuestionForm.bind(this)
    this.getQuestions = this.getQuestions.bind(this)
    this.submitOrCancel = this.submitOrCancel.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
  }

  submitOrCancel () {
    this.setState({
      askQuestion: false
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
    if (this.state.askQuestion) {
      return (
        <div>
          <AskQuestionForm submitOrCancel={this.submitOrCancel} />
        </div>
      )
    } else if (this.state.searchValue) {
      const filteredArray = this.state.questions.filter(question => question.title.toLowerCase().includes(this.state.searchValue.toLowerCase()))
      return (
        <div>
          <div className='input-group'>
            <input type='text' placeholder='search...' onChange={this.handleSearch} />
          </div>
          <button onClick={this.askQuestionForm} >Ask a question</button>
          {filteredArray.map((question, idx) => (
            <div key={idx}>
              <Question question={question} />
            </div>
          ))}
        </div>
      )
    } else {
      return (
        <div className='Dashboard'>
          <div className='input-group'>
            <input type='text' placeholder='search...' onChange={this.handleSearch} />
          </div>
          <button onClick={this.askQuestionForm} >Ask a question</button>
          <div className='questions-container'>
            {this.state.questions.map((question, idx) => (
              <div key={idx}>
                <Question question={question} />
              </div>
            ))}
          </div>
        </div>
      )
    }
  }
}

export default DashboardLoggedIn