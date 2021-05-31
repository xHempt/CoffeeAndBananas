import React from 'react'
import Land from './Land'
import About from './About'
import PostsPreview from './PostsPreview'

export default function Home({ id, op, likes }) {
    return (
        <main>
            <Land />
            <About />
            <PostsPreview id={id} likes={likes} />
        </main>
    )
}
