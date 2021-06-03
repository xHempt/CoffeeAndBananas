import React from 'react'
import Land from './Land'
import About from './About'
import { Link, withRouter } from 'react-router-dom'
import PostsPreview from './PostsPreview'

export default withRouter(function Home({ id, op, likes }) {
    return (
        <main>
            <Land />
            <PostsPreview id={id} likes={likes} />
            <About />
            { op === '1' ? <Link to="/addpost" className="add-post">+</Link> : <></> }
        </main>
    )
})
