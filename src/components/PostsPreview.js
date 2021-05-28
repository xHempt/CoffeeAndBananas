import React, { useState, useEffect } from 'react'
import axios from 'axios'
import PreviewPost from './PreviewPost'

export default function PostsPreview() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        axios.get('/api/prevposts')
            .then((res) => setPosts(res.data))
            .catch((err) => console.log(err))
    }, [])

    return (
        <div className="post-preview">
            {posts.map((post, index) => (<PreviewPost post={post} key={index} />))}
        </div>
    )
}
