import React, { useRef, useState } from 'react'
import axios from 'axios'

export default function Login({ onLogin }) {
    const emailRef = useRef('')
    const passRef = useRef('')
    const [error, setError] = useState('')

    function handleSubmit(e) {
        e.preventDefault()

        const data = {
            email: emailRef.current.value,
            pass: passRef.current.value
        }

        axios.post('/api/login', data)
            .then((res) => {
                if(res.data.msg === 'Invalid email or password!') {
                    setError(res.data.msg)
                    return
                }
                onLogin(res.data.id)
                goToMain()
            })
            .catch((err) => console.log(err))
    }
        
    function goToMain() {
        window.location.replace('/')
    }

    return (
        <div className="login">
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Enter email</label>
                <input type="email" name="email" required ref={emailRef} />
                <label htmlFor="pass">Enter password</label>
                <input type="password" name="password" required ref={passRef} />
                <button type="submit">LOG IN</button>
            </form>
            <div className="err-popup">
                {error}
            </div>
        </div>
    )
}
