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
        <h2 className='questionbox'><span className='q'>Q:</span>{question.title}</h2>
        {this.state.questionExpanded && (<p className='questionBody'><span className='a'>A:</span>{question.body}</p>)}
      </div>
    )
  }
}

export default Question
