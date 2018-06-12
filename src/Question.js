import React, { Component } from 'react'
import './App.css'
import 'shoelace-css/dist/shoelace.css'
import showdown from 'showdown'
// import { request } from 'https';
import request from 'superagent'
import Answer from './Answer'
import AnswerForm from './AnswerForm'

class Question extends Component {
  constructor () {
    super()
    this.state = {
      questionExpanded: false,
      answers: [],
      id: '',
      user_id: ''
    }
    this.expandQuestion = this.expandQuestion.bind(this)
    this.updateAnswers = this.updateAnswers.bind(this)
    this.validateAnswer = this.validateAnswer.bind(this)
  }

  updateAnswers (newAnswer) {
    this.setState({
      answers: this.state.answers.concat(newAnswer)
    })
  }

  validateAnswer (id) {
    const idx = this.state.answers.findIndex(answer => answer.id === id)
    console.log(idx)
  }

  expandQuestion (e) {
    const id = e.target.dataset.id
    this.setState({questionExpanded: !this.state.questionExpanded})
    request
      .get(`https://whispering-stream-62515.herokuapp.com/api/v1/questions/${id}`)
      .set('X-Requested-With', 'XMLHttpRequest')
      .then(res => {
        console.log(res)
        this.setState({
          answers: res.body.data.attributes.answers,
          id: res.body.data.attributes.id,
          user_id: res.body.data.attributes.user_id
        })
      })
  }

  render () {
    const converter = new showdown.Converter()
    let question = this.props.question
    return (
      <div className='Question'>
        <h1>{question.title}</h1>
        <div dangerouslySetInnerHTML={{__html: converter.makeHtml(question.body)}} />
        {this.state.questionExpanded ? (
          <div>
            <button onClick={this.expandQuestion} data-id={question.id} className='answer-button button-block button-light'>Show Less</button>
            {this.state.answers.map((answer, idx) => (
              <div className='answer' key={idx}>
                <Answer answer={answer} user_id={this.state.user_id} validateAnswer={this.validateAnswer} />
              </div>
            ))}
            <div className='answer-form'>
              <AnswerForm id={this.state.id} updateAnswer={this.updateAnswers} />
            </div>
          </div>
        ) : (
          <button onClick={this.expandQuestion} data-id={question.id} className='answer-button button-block button-light'>Show Answers</button>
        )}
      </div>
    )
  }
}

export default Question
