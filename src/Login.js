import React, {Component} from 'react';
import './App.css';
import 'shoelace-css/dist/shoelace.css';
import request from 'superagent'

class Login extends Component {
    constructor () {
        super()
        this.state = {
            username: '',
            password: '',
            userId: ''
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
            this.props.updateToken()
            this.setState({
                userId :res.id
            })
            })
            .catch(err => {
                const form = document.querySelectorAll('.input-field')
                form.forEach(field => {
                    field.classList.add('input-invalid')
                })
                const password = document.querySelector('.password')
                const error = document.createElement('p')
                error.classList.add('text-danger')
                error.innerText = 'Incorrect username or password'
                password.append(error)
            })
    }

    render () {
    return (
        <div className='Login'>
            <h1>Login</h1>
            <form onSubmit={this.handleSubmit}>
                <div className="input-field">
                    <label>Name</label>
                    <input name="username" value={this.state.username} onChange={this.handleChange} type="text"/>
                </div>

                <div className="input-field password">
                    <label>Password</label>
                    <input name="password" value={this.state.password} onChange={this.handleChange} type="password"/>
                </div>

                <button type="submit" className="button">Login</button>
                <button className='button-danger' onClick={this.props.cancel}>Cancel</button>
            </form>
        </div>
    )
    }
}

export default Login