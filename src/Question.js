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

  expandQuestion (e) {
    console.log(e.target.dataset.id)
    this.setState({questionExpanded: !this.state.questionExpanded})
    // console.log(this.state.questionExpanded)
  }

  render () {
    const converter = new showdown.Converter()
    let question = this.props.question
    return (
      <div className='Question'>
        <h1>{question.title}</h1>
        {this.state.questionExpanded && (
          // <h2>dangerouslySetInnerHTML={{__html: converter.makeHtml(question.body)}}</h2>
          <div dangerouslySetInnerHTML={{__html: converter.makeHtml(question.body)}} />
        )}
        <h2 className='questionbox'><span className='q'>Q:</span>{question.title}</h2>
        <button onClick={this.expandQuestion} data-id={question.id}>Show Answers</button>
        {this.state.questionExpanded && (<p className='questionBody'><span className='a'>A:</span>{question.body}</p>)}
      </div>
    )
  }
}

export default Question
