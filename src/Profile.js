import React, {Component} from 'react'
import './App.css'
import './DashboardLoggedIn.js'
// import Login from './Login'
import 'shoelace-css/dist/shoelace.css'
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

    this.logout = this.logout.bind(this)
  }

  componentDidMount () {
    request
      .get(`https://whispering-stream-62515.herokuapp.com/api/v1/users/${localStorage.id}`)
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

  logout () {
    localStorage.clear()
    this.props.updateToken()
  }

  render () {
    return (
      <div className='Profile'>
        <h1>PROFILE</h1>
        <button className='button-danger' onClick={this.props.profileState}>Cancel</button>
        <button onClick={this.logout}>Logout</button>
        <div>{this.state.username}</div>
        <div>{this.state.email}</div>
        {/* <div>{this.state.userQuestions[0]}</div>
        <div>{this.state.userAnswers[0]}</div> */}
      </div>
    )
  }
}

export default Profile
