import React, {Component} from 'react';
import './App.css';
import 'shoelace-css/dist/shoelace.css';

class Login extends Component {
    constructor () {
        super()
        this.state = {
            username: '',
            password: ''
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
    }

    render () {
    return (
        <div className='Login'>
        <h1>Log-in:</h1>
            <div className="input-field">
                <label>Name</label>
                <input name="username" value={this.state.username} onChange={this.handleChangeUser} type="text"/>
            </div>

            <div className="input-field">
                <label>Password</label>
                <input name="password" value={this.state.password} onChange={this.handleChangePass} type="password"/>
            </div>

            <button type="button" className="button" onClick={this.handleClick}>Log-in</button>
        </div>
    )
    }
}

export default Login