/* global localStorage */

import React, { Component } from 'react'
import './App.css'
import 'shoelace-css/dist/shoelace.css'
// import showdown from 'showdown'
// import { request } from 'https';
import request from 'superagent'

class AnswerForm extends Component {
  constructor () {
    super()
    this.state = {
      answer: ''
    }

    this.submitAnswer = this.submitAnswer.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  submitAnswer (e) {
    e.preventDefault()
    if (this.state.answer) {
      request
        .post('https://whispering-stream-62515.herokuapp.com/api/v1/answers/')
        .set('X-Requested-With', 'XMLHttpRequest')
        .set('Authorization', `Bearer ${localStorage.token}`)
        .send({
          question_id: this.props.id,
          text: this.state.answer
        })
        .then(res => {
          // console.log(res)
          const newAnswer = res.body
          this.props.updateAnswer(newAnswer)
        })
      document.querySelector('.form').reset()
    }
  }

  handleChange (e) {
    this.setState({
      answer: e.target.value
    })
  }

  render () {
    return (
      <div className='AnswerForm'>
        <form onSubmit={this.submitAnswer} className='form submit-answerForm'>
          {localStorage.token && (
            <div>
              <strong>Your Answer:</strong>
              <textarea onChange={this.handleChange} />
              <button type='submit' className='button-dark'>Submit Answer!</button>
            </div>
          )}
        </form>
      </div>
    )
  }
}

export default AnswerForm
