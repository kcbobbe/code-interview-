import React, {Component} from 'react';
import './App.css';
import 'shoelace-css/dist/shoelace.css';

class Register extends Component {
    constructor () {
        super()
        this.state = {
            username: '',
            password: '',
            email: ''
        }
    }

    handleChangeUser = (event) => {
        const { value } = event.target
        this.setState( {
            username: value,
        })
    }

    handleChangePass = (event) => {
        const { value } = event.target
        this.setState( {
            password: value,
        })
    }

    handleClick = (event) => {
        event.preventDefault()
        this.props.login()
    }

    handleChangeEmail = (event) => {

    }

    render () {
    return (
        <div className='Register'>
        <h1>Login</h1>
            <div className="input-field">
                <label>Name</label>
                <input name="username" value={this.state.username} onChange={this.handleChangeUser} type="text"/>
            </div>

            <div className="input-field">
                <label>Password</label>
                <input name="password" value={this.state.password} onChange={this.handleChangePass} type="password"/>
            </div>

            <div className="input-field">
                <label>Email</label>
                <input name="email" value={this.state.email} onChange={this.handleChangeEmail} type="email"/>
            </div>

            <button type="button" className="button" onClick={this.handleClick}>Register</button>
            <button className='button-danger' onClick={this.props.cancel}>Cancel</button>
        </div>
    )
    }
}

export default Register