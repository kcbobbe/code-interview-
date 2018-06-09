import React, { Component } from 'react'
import './App.css'
import 'shoelace-css/dist/shoelace.css'
import showdown from 'showdown'

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
    const converter = new showdown.Converter()
    let question = this.props.question
    return (
      <div onClick={this.expandQuestion} className='Question'>
        <h1>{question.title}</h1>
        {this.state.questionExpanded && (
          // <h2>dangerouslySetInnerHTML={{__html: converter.makeHtml(question.body)}}</h2>
          <div dangerouslySetInnerHTML={{__html: converter.makeHtml(question.body)}} />
        )}
      </div>
    )
  }
}

export default Question
