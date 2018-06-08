import React, { Component } from 'react'
import './App.css'
import 'shoelace-css/dist/shoelace.css'
// import request from 'superagent'
// import Dashboard from './Dashboard'
// import Login from './Login'

class AskQuestionForm extends Component {
  constructor () {
    super()
    this.state = {
      // askQuestion: this.props.askQuestion,
      askQuestion: null,
      questionTitle: null,
      questionBody: null
    }

    this.addQuestion = this.addQuestion.bind(this)
    this.cancelAdd = this.cancelAdd.bind(this)
    this.questionBody = this.questionBody.bind(this)
    this.questionTitle = this.questionTitle.bind(this)
  }
  cancelAdd () {
    this.props.submitOrCancel()
  }

  addQuestion (e) {
    e.preventDefault()
    // request
    //   .post('http://localhost:8000/Questions')
    //   .send({
    //     'title': this.state.questionTitle,
    //     'body': this.state.questionBody,
    //     'userId': 3
    //   })
    //   .then((res) => {
    //     this.setState({
    //       askQuestion: false,
    //       questionTitle: '',
    //       questionBody: ''
    //     })
    //   })
    this.props.submitOrCancel()
  }
  questionTitle (event) {
    this.setState({
      questionTitle: event.target.value
    })
  }

  questionBody (event) {
    this.setState({
      questionBody: event.target.value
    })
  }

  render () {
    return (
      <div className='AskQuestionForm'>
        <form onSubmit={this.addQuestion}>
          <input type='text' placeholder='title' onChange={this.questionTitle} />
          <textarea onChange={this.questionBody} />
          <button className='button-danger' onClick={this.cancelAdd}>Cancel</button>
          <button className='button-success' type='submit'>Submit</button>
        </form>
      </div>
    )
  }
}

export default AskQuestionForm
