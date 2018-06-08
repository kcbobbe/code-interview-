import React, {Component} from 'react';
import './App.css';
import 'shoelace-css/dist/shoelace.css';
import request from 'superagent'

class Register extends Component {
    constructor () {
        super()
        this.state = {
            username: '',
            password: '',
            email: ''
        }
    }

    handleChange = (event) => {
      const { value } = event.target
      const name = event.target.name
      this.setState({
        [name]: value
      })
    }

    handleClick = (event) => {
        event.preventDefault()
        request
          .post('https://whispering-stream-62515.herokuapp.com/api/v1/users')
          .set('X-Requested-With', 'XMLHttpRequest')
          .send({
            username: this.state.username,
            password: this.state.password,
            email_address: this.state.email
          })
          request
          // .post('https://whispering-stream-62515.herokuapp.com/api/v1/sessions')
          // .set('X-Requested-With', 'XMLHttpRequest')
          // .send({
          //   username: this.state.username,
          //   password: this.state.password
          // })
          // .then(res => {
            
          // })
        // this.props.login()
    }

    render () {
    return (
        <div className='Register'>
        <h1>Login</h1>
            <div className="input-field">
                <label>Name</label>
                <input name="username" value={this.state.username} onChange={this.handleChange} type="text"/>
            </div>

            <div className="input-field">
                <label>Password</label>
                <input name="password" value={this.state.password} onChange={this.handleChange} type="password"/>
            </div>

            <div className="input-field">
                <label>Email</label>
                <input name="email" value={this.state.email} onChange={this.handleChange} type="email"/>
            </div>

            <button type="button" className="button" onClick={this.handleClick}>Register</button>
            <button className='button-danger' onClick={this.props.cancel}>Cancel</button>
        </div>
    )
    }
}

export default Register