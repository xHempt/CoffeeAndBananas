import React, { useState } from 'react'
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

    function handleRedirect() {
        window.location.assign(path)
    }

    return (
        <div className="preview-post">
            <div className="preview-post-img" style={{backgroundImage: `url(/${post.background})`, backgroundSize: 'cover', backgroundPosition: 'center center' }} />
            <div className="preview-post-desc">
                <article>
                    <div className="preview-post-category">
                        <span className="gold">
                            {post.category}
                        </span>
                        <span className="preview-post-date muted">
                            {post.date}
                        </span>
                    </div>
                    <div className="preview-post-headline">
                        <h2>
                            {post.headline}    
                        </h2>
                    </div>
                    <div className="preview-post-content">
                        <p>    
                            {post.content}
                        </p>
                    </div>
                </article>
                <div className="preview-post-read">
                    <span onClick={handleRedirect} style={{cursor: 'pointer'}} className="gold">
                        READ MORE &#62;
                    </span>
                    <span className={newLiked || liked ? 'gold' : ''}>
                        <i className="fa fa-thumbs-up" style={{cursor: 'pointer'}} onClick={handleLike}></i>
                        <span> {newLiked ? post.likes : post.likes - 1}</span>
                    </span>
                </div>
            </div>
        </div>
    )
}
