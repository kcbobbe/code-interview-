import React, { Component } from 'react'
import './App.css'
import 'shoelace-css/dist/shoelace.css'
import request from 'superagent'
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
  }
  cancelAdd () {
    this.setState({
      askQuestion: false
    })
    console.log(this.props.askQuestion)
  }

  addQuestion () {
    request.post('http://localhost:8000/Questions')
      .send({
        'title': this.state.questionTitle,
        'body': this.state.questionBody
      })
      .then((res) => {
        this.setState({
          askQuestion: false,
          questionTitle: 'null',
          questionBody: 'null'
        })
      })
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
        <form>
          <input type='text' placeholder='title' onChange={this.questionTitle.bind(this)} />
          <textarea onChange={this.questionBody.bind(this)}/>
          <button className='button-danger' onClick={this.cancelAdd.bind(this)}>Cancel</button>
          <button className='button-success' onClick={this.addQuestion.bind(this)}>Submit</button>
        </form>
      </div>
    )
  }
}

export default AskQuestionForm
