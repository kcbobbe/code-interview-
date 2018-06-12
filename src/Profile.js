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
      userAnswers: []
    }

    this.logout = this.logout.bind(this)
    this.getQuestions = this.getQuestions.bind(this)
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
          userAnswers: res.body.data.attributes.answers.answers,
          questionNumber: res.body.data.attributes.questions.total_questions,
          answerNumber: res.body.data.attributes.answers.total_answers
        })

        this.getQuestions(res.body.data.attributes.questions.next)
      })
  }

  getQuestions (next) {
    request
      .get(`https://whispering-stream-62515.herokuapp.com/api/v1${next}`)
      .then(res => {
        this.setState({
          userQuestions: this.state.userQuestions.concat(res.body.data.attributes.questions.questions)
        })
        if (res.body.next) {
          this.getQuestions(res.body.data.attributes.questions.next)
        }
      })
  }

  logout () {
    localStorage.clear()
    this.props.updateToken()
  }

  render () {
    console.log(this.state.userAnswers)
    return (
      <div className='Profile'>
        <div className='user-info'>
          <h1>Your Proflie</h1>
          <div>Username: {this.state.username}</div>
          <div>Email Address: {this.state.email}</div>
          <div>Number of questions asked: {this.state.questionNumber}</div>
          <div>Number of questions answered: {this.state.answerNumber}</div>
        </div>
        <div className='user-QA'>
          <div className='questions-column'>
            <div><strong>Questions you've asked!</strong></div>
            <div className='questions-container profile-box'>
              {this.state.userQuestions.map((question, idx) => (
                <div key={idx}>
                  <Question question={question} />
                </div>
              ))}
            </div>
          </div>
          <div className='answers-column'>
            <div><strong>Answers you've submitted!</strong></div>
            <div className='answers-container'>
              {this.state.userAnswers.map((answer, idx) => (
                <div key={idx} className='user-answers'>
                  <div><strong>Q: {answer.question_title}</strong></div>
                  <div>{answer.question_body}</div>
                  <div>A: {answer.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className='profile-buttons'>
          <button className='button-danger' onClick={this.props.profileState}>Cancel</button>
          <button onClick={this.logout}>Logout</button>
        </div>
        {/* <div>{this.state.userQuestions[0]}</div>
        <div>{this.state.userAnswers[0]}</div> */}
      </div>
    )
  }
}

export default Profile
