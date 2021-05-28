import React, { Component } from 'react'
import axios from 'axios'

export class Register extends Component {
    state = {
        name: '',
        email: '',
        pass: '',
        news: false,
        error: ''
    }

    handleChange = ({ target }) => {
        const {name, value} = target
        if(name !== 'news') {
            this.setState({[name]: value})
            return
        }

        this.setState({news: !this.state.news})
    }

    handleRegistration = (e) => {
        e.preventDefault()

        const data = {
            name: this.state.name,
            email: this.state.email,
            pass: this.state.pass,
            news: this.state.news
        }

        axios.post('/api/register', data)
            .then((res) => {
                if(res.data.msg === 'Email already in use!') {
                    this.setState({ error: res.data.msg })
                    return
                }
                this.goToMain()
            })
            .catch((err) => console.log(err))

    }

    goToMain = () => {
        window.location.replace('/')
    }

    render() {
        return (
            <div className="register">
                <form onSubmit={this.handleRegistration}>
                    <label htmlFor="name">Your name</label>
                    <input type="text" name="name" required onChange={this.handleChange} value={this.state.name} />
                    <label htmlFor="email">Your email</label>
                    <input type="email" name="email" required onChange={this.handleChange} value={this.state.email} />
                    <label htmlFor="pass">Your password</label>
                    <input type="password" name="pass" required onChange={this.handleChange} value={this.state.pass} />
                    <label htmlFor="newsletter">Send me an email whenever David posts a new blog post</label>
                    <input type="checkbox" name="news" id="news" onChange={this.handleChange} value={this.state.news} />
                    <button type="submit">REGISTER</button>
                </form>
                <div className="err-popup">
                    {this.state.error}
                </div>
            </div>
        )
    }
}

export default Register
