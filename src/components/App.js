import React, { useState } from 'react'
import axios from 'axios'
import Header from './Header'
import Home from './Home'
import Register from './Register'
import Login from './Login'
import AddPost from './AddPost'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import useLocalStorage from '../hooks/useLocalStorage';
import Footer from './Footer'
import Post from './Post'
import Categories from './Categories'

export default function App() {
  const [id, setId] = useLocalStorage('id', '')

  const [name, setName] = useState('')
  const [op, setOp] = useState('')
  const [likes, setLikes] = useState([])

  function findUser() {
    if(id) {
      axios.post('/api/who', { id: id })
        .then((res) => {
          setName(res.data.name)
          setOp(res.data.perm)
          setLikes(res.data.likes)
        })
        .catch((err) => console.log(err))
    } else {
      return
    }
  }
    return (
    <div onLoad={findUser}>
      <Router>
        <Header name={name} onLogout={setId} op={op} />
        <Switch>
          <Route path="/" exact component={() => <Home id={id} op={op} likes={likes} />}/>
          <Route path="/addpost" exact component={() => <AddPost op={op} />} />
          <Route path="/register" exact component={() => <Register />} />
          <Route path="/login" exact component={() => <Login onLogin={setId} />}/>
          <Route path="/post" exact component={() => <Post id={id} liked={likes} />} />
          <Route path="/category" exact component={() => <Categories id={id} likes={likes} />} />
        </Switch>
        <Footer />
      </Router>
    </div>
  )
}
