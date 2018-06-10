import React, {Component} from 'react';
import './App.css';
import 'shoelace-css/dist/shoelace.css';
import request from 'superagent'

class Login extends Component {
    constructor () {
        super()
        this.state = {
            username: '',
            password: ''
        }
    }

    handleChange = (event) => {
        const value = event.target.value
        const name = event.target.name
        this.setState({
            [name]: value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        request
            .post('https://whispering-stream-62515.herokuapp.com/api/v1/sessions')
            .set('X-Requested-With', 'XMLHttpRequest')
            .send({
            username: this.state.username,
            password: this.state.password
            })
            .then(res => {
            console.log(res)
            localStorage.token = res.body.token
            localStorage.id = res.body.id
            this.props.updateToken()
            })
            .catch(err => {
                const form = document.querySelectorAll('.input-field')
                form.forEach(field => {
                    field.classList.add('input-invalid')
                })
                const errorDiv = document.querySelector('.error')
                const error = document.createElement('p')
                error.classList.add('text-danger')
                error.innerText = 'Incorrect username or password'
                errorDiv.append(error)
            })
    }

    render () {
    return (
        <div className='Login'>
            <h1>Login</h1>
            <form onSubmit={this.handleSubmit}>
                <div className="input-field input-group">
                    <span className='input-addon input-addon-l'>Name:</span>
                    <input name="username" value={this.state.username} className='login-input input-l' onChange={this.handleChange} type="text"/>
                </div>

                <div className="input-field input-group password">
                    <span className='input-addon input-addon-l'>Password:</span>
                    <input name="password" value={this.state.password} className ='login-input input-l' onChange={this.handleChange} type="password"/>
                </div>
                <div className='error'></div>
                {/* <div className='login-buttons input-group'> */}
                    <button type="submit" className="button">Login</button>
                    <button className='button-danger' onClick={this.props.cancel}>Cancel</button>
                {/* </div> */}
            </form>
        </div>
    )
    }
}

export default Login