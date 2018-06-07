import React, { Component } from 'react'
import './App.css'
import 'shoelace-css/dist/shoelace.css'
import Question from './Question'
import request from 'superagent'

class Dashboard extends Component {
  constructor () {
    super()
    this.state = {
      questions: []
    }
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

  render () {
    return (
      <div className='Dashboard'>
        <header className='header'>
          <h1 className='title'>Interview Questions</h1>
          <button className='login'>Login</button>
        </header>
        <div className='container'>
          <div className='input-group'>
            <input type='text' placeholder='search...' />
            <button type='button' className='button'>Submit</button>
          </div>
          <button>Ask a question</button>
          <div className='questions-container'>
            {this.state.questions.map((question, idx) => (
              <div key={idx}>
                <Question question={question} />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default Dashboard
