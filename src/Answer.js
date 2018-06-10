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
        // console.log(res)
        this.setState({
          user: res.body.data.attributes
        })
      })
  }

  render () {
    return (
      <div className='Answer'>
        <h3>{this.state.user.username}</h3>
        <div>{this.props.answer.text}</div>
      </div>
    )
  }
}

export default Answer
