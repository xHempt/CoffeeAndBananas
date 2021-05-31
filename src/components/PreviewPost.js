import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function PreviewPost({ post, id, liked }) {
    const [newLiked, setNewLiked] = useState()

    function handleLike() {
        const data = {
            userId: id,
            postId: post._id
        }
        axios.post('/api/like', data)
            .then((res) => {
                console.log(res.data)
                if (res.data.msg === 'login') {
                    window.location.replace('/login')
                } else if (res.data.msg === 'Post liked!') {
                    setNewLiked(true)
                } else if (res.data.msg === 'Post disliked!') {
                    setNewLiked(false)
                }
            })
            .catch((err) => console.log(err))
    }

    const path = `/post/?id=${post._id}`

    return (
        <div className="preview-post">
            <div className="preview-post-img" style={{backgroundImage: `url(${post.background})`, backgroundSize: 'cover', backgroundPosition: 'center center' }}>
            </div>
            <div className="preview-post-desc">
                <div>
                    <div className="preview-post-category gold">
                        {post.category}
                    </div>
                    <div className="preview-post-headline">
                        <h2>
                            {post.headline}    
                        </h2>
                    </div>
                    <div className="preview-post-date muted">
                        {post.date}
                    </div>
                    <div className="preview-post-content">
                        {post.content}
                    </div>
                </div>
                <div className="preview-post-read">
                    <Link to={path} className="gold">
                        READ MORE &#62;
                    </Link>
                    <span className={newLiked || liked ? 'gold' : ''}>
                        <i className="fa fa-thumbs-up" style={{cursor: 'pointer'}} onClick={handleLike}></i>
                        {newLiked ? post.likes : post.likes - 1}
                    </span>
                </div>
            </div>
        </div>
    )
}
