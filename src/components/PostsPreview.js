import React, { useState, useEffect } from 'react'
import axios from 'axios'
import PreviewPost from './PreviewPost'
import { Link, withRouter } from 'react-router-dom'

export default withRouter(function PostsPreview({ id, likes }) {
    const [posts, setPosts] = useState([])
    // const [isLiked, setIsLiked] = useState(false)

    useEffect(() => {
        axios.get('/api/prevposts')
            .then((res) => {
                setPosts(res.data)
            })
            .catch((err) => console.log(err))   
    }, [])

    return (
        <section className="post-section" id="recent-posts"> 
            <h1 className="gold">RECENT POSTS</h1>
            <div className="post-preview">
                <div className="posts">
                    {posts.map((post, index) => (<PreviewPost post={post} key={index} id={id} liked={ likes.includes(post._id) ? true : false } />))}
                </div>
                <div className="categories">
                    <div className="container">
                        <h3>CATEGORIES</h3>
                        <ul>
                            <li>
                                <Link to="/category/?name=Self-Development" className="gold">Self Development</Link>
                            </li>
                            <li>
                                <Link to="/category/?name=Time-Management" className="gold">Time Management</Link>
                            </li>
                            <li>
                                <Link to="/category/?name=Web-Development" className="gold">Web Development</Link>
                            </li>
                            <li>
                                <Link to="/category/?name=Tutorial" className="gold">Tutorials</Link>
                            </li>
                            <li>
                                <Link to="/category/?name=Top" className="gold">Top Posts</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
})
