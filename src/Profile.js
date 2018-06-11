import React, {Component} from 'react'
import './App.css'
import './DashboardLoggedIn.js'
import Question from './Question'
// import Login from './Login'
import 'shoelace-css/dist/shoelace.css'
import request from 'superagent'

class Profile extends Component {
  constructor () {
    super()
    this.state = {
      username: '',
      email: '',
      userQuestions: [],
      userAnswers: 'Answers'
    }

    this.logout = this.logout.bind(this)
  }

  componentDidMount () {
    request
      .get(`https://whispering-stream-62515.herokuapp.com/api/v1/users/${localStorage.id}`)
      // .get(`https://whispering-stream-62515.herokuapp.com/api/v1/users/4`)
      .set('X-Requested-With', 'XMLHttpRequest')
      .then(res => {
        console.log(res)
        this.setState({
          username: res.body.data.attributes.username,
          email: res.body.data.attributes.email_address,
          userQuestions: res.body.data.attributes.questions.questions,
          userAnswers: res.body.data.attributes.answers,
          questionNumber: res.body.data.attributes.questions.total_questions,
          answerNumber: res.body.data.attributes.answers.total_answers
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
        <h1>Your Proflie</h1>
        <div>Username: {this.state.username}</div>
        <div>Email Address: {this.state.email}</div>
        <div>Number of questions asked: {this.state.questionNumber}</div>
        <div>Number of questions answered: {this.state.answerNumber}</div>
        <div className='questions-column'>
          <h2>Questions you've asked!</h2>
          <div className='questions-container'>
            {this.state.userQuestions.map((question, idx) => (
              <div key={idx}>
                <Question question={question} />
              </div>
            ))}
          </div>
        </div>
        <div className='answers-column'>
          <h2>Answers you've submitted!</h2>
          {/* <div className='answers-container'>
            {this.state.userAnswers.map((question, idx) => (
              <div key={idx}>
                <Answer />
              </div>
            ))}
          </div> */}
        </div>
        <button className='button-danger' onClick={this.props.profileState}>Cancel</button>
        <button onClick={this.logout}>Logout</button>
        {/* <div>{this.state.userQuestions[0]}</div>
        <div>{this.state.userAnswers[0]}</div> */}
      </div>
    )
  }
}

export default Profile
