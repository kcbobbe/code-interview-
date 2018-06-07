import React, { Component } from 'react'
import './App.css'
import 'shoelace-css/dist/shoelace.css'
// import Dashboard from './Dashboard'
// import Login from './Login'

class AskQuestionForm extends Component {
  render () {
    return (
      <div className='AskQuestionForm'>
        <form>
          <input type='text' placeholder='title' />
          <textarea />
          <button className='button-danger'>Cancel</button>
          <button className='button-success'>Submit</button>
        </form>
      </div>
    )
  }
}

export default AskQuestionForm
