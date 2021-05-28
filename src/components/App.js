import React, { useState } from 'react'
import axios from 'axios'
import Header from './Header'
import Home from './Home'
import Register from './Register'
import Login from './Login'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import useLocalStorage from '../hooks/useLocalStorage';

export default function App() {
  const [id, setId] = useLocalStorage('id', '')

  const [name, setName] = useState('')

  function findUser() {
    if(id) {
      axios.post('/api/who', { id: id })
        .then((res) => {
          setName(res.data.name)
        })
        .catch((err) => console.log(err))
    } else {
      return
    }
  }
  
    return (
    <div onLoad={findUser}>
      <Router>
        <Header name={name} onLogout={setId} />
        <Switch>
          <Route path="/" exact component={() => <Home id={id} />}/>
          <Route path="/register" exact component={() => <Register />}/>
          <Route path="/login" exact component={() => <Login onLogin={setId} />}/>
        </Switch>
      </Router>
    </div>
  )
}
