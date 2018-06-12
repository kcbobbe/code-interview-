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
      user: [],
      validated: null
    }

    this.validate = this.validate.bind(this)
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
    console.log(this.props.answer)
  }

  validate (e) {
    // console.log('click')
    // console.log(e.target)
    // console.log(this.props.answer.id)
    request
      .patch(`https://whispering-stream-62515.herokuapp.com/api/v1/answers/${this.props.answer.id}`)
      .set('X-Requested-With', 'XMLHttpRequest')
      .set('Authorization', `Bearer ${localStorage.token}`)
      .send({
        valid_answer: true
      })
      .then(res => {
        console.log(res)
        this.setState({
          validated: res.body.valid_answer
        })
      })
  }

  render () {
    // console.log(this.props.answer)
    const converter = new showdown.Converter()
    if (this.props.answer.valid_answer) {
      return (
        <div className='Answer'>
          <h4 className='hidden'>Correct Answer!</h4>
          <h3>{this.state.user.username}</h3>
          <div dangerouslySetInnerHTML={{__html: converter.makeHtml(this.props.answer.text)}} />
          {this.props.user_id == localStorage.id && (
            <button onClick={this.validate}>Mark as correct answer!</button>
          )}
        </div>
      )
    } else {
      return (
        <div className='Answer'>
          <h3>{this.state.user.username}</h3>
          <div dangerouslySetInnerHTML={{__html: converter.makeHtml(this.props.answer.text)}} />
          {this.props.user_id == localStorage.id && (
            <button onClick={this.validate}>Mark as correct answer!</button>
          )}
        </div>
      )
    }
  }
}

export default Answer
