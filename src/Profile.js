import React, {Component} from 'react';
import './App.css';
import './DashboardLoggedIn.js'
import Login from './Login'
import 'shoelace-css/dist/shoelace.css';
import request from 'superagent'

class Profile extends Component {
  constructor () {
    super()
    this.state = {
      username: '',
      email: '',
      userQuestions: '?????????',
      userAnswers: 'Answers'
    }
  }

  componentDidMount () {
    request
      .get('https://whispering-stream-62515.herokuapp.com/api/v1/users/1')
      .set('X-Requested-With', 'XMLHttpRequest')
      .then(res => {
        console.log(res)
        this.setState({
          username: res.body.data.attributes.username,
          email: res.body.data.attributes.email_address,
          userQuestions: res.body.data.attributes.questions,
          userAnswers: res.body.data.attributes.answers
        })
      })
  }
  // handleChange=(event) => {
  //     const value = event.target.value
  //     const name = event.target.name
  //     this.setState({
  //         [name]: value
  //     })
  // }

  // handleSubmit = (event) => {
  //     event.preventDefault()
  //     request
  //         .post('https://whispering-stream-62515.herokuapp.com/api/v1/sessions')
  //         .set('X-Requested-With', 'XMLHttpRequest')
  //         .send({
  //         username: this.state.username,
  //         password: this.state.password
  //         })
  //         .then(res => {
  //         console.log(res)
  //         localStorage.token = res.body.token
  //         this.props.updateToken()
  //         })
  //         .catch(err => {
  //             const form = document.querySelectorAll('.input-field')
  //             form.forEach(field => {
  //                 field.classList.add('input-invalid')
  //             })
  //             const password = document.querySelector('.password')
  //             const error = document.createElement('p')
  //             error.classList.add('text-danger')
  //             error.innerText = 'Incorrect username or password'
  //             password.append(error)
  //         })
  // }

  render () {
    return (
      <div className='Profile'>
        <h1>PROFILE</h1>
        <button className='button-danger' onClick={this.props.profileState}>Cancel</button>
        <div>{this.state.username}</div>
        <div>{this.state.email}</div>
        {/* <div>{this.state.userQuestions[0]}</div>
        <div>{this.state.userAnswers[0]}</div> */}
      </div>
    )
  }
}

export default Profile
