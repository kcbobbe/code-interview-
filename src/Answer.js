import React, { Component } from 'react'
import './App.css'
import 'shoelace-css/dist/shoelace.css'
import showdown from 'showdown'
// import { request } from 'https';
import request from 'superagent'

class Answer extends Component {
  constructor () {
    super()
    this.state = {
      user: []
    }
  }

  componentDidMount () {
    request
      .get(`https://whispering-stream-62515.herokuapp.com/api/v1/users/${this.props.answer.user_id}`)
      .set('X-Requested-With', 'XMLHttpRequest')
      .then(res => {
        this.setState({
          user: res.body.data.attributes
        })
      })
  }

  render () {
    const converter = new showdown.Converter()
    return (
      <div className='Answer'>
        <h4 className='hidden'>Correct Answer!</h4>
        <h3>{this.state.user.username}</h3>
        <div dangerouslySetInnerHTML={{__html: converter.makeHtml(this.props.answer.text)}} />
        {this.props.user_id == localStorage.id && (
          <button>Mark as correct answer!</button>
        )}
      </div>
    )
  }
}

export default Answer
