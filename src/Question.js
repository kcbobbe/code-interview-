import React, { Component } from 'react'
import './App.css'
import 'shoelace-css/dist/shoelace.css'

class Question extends Component {
  constructor () {
    super()
    this.state = {
      questionExpanded: false
    }
    this.expandQuestion = this.expandQuestion.bind(this)
  }

  expandQuestion () {
    this.setState({questionExpanded: !this.state.questionExpanded})
    console.log(this.state.questionExpanded)
  }

  render () {
    let question = this.props.question
    return (
      <div onClick={this.expandQuestion} className='Question'>
        <h1>{question.title}</h1>
        {this.state.questionExpanded && (<p>{question.body}</p>)}
      </div>
    )
  }
}

export default Question
