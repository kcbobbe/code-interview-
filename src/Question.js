import React, { Component } from 'react'
import './App.css'
import 'shoelace-css/dist/shoelace.css'

class Question extends Component {
  render () {
    let question = this.props.question
    return (
      <div className='Question'>
        <h1>{question.title}</h1>
        <p>{question.body}</p>
      </div>
    )
  }
}

export default Question
