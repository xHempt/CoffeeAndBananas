import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'

export default function Post({ id, liked }) {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    const postID = urlParams.get("id")
    const [postData, setPostData] = useState({});
    const commentContent = useRef('')

    useEffect(() => {
        window.scrollTo(0, 0)
        const data = {
            id: postID
        }

        axios.post('/api/getpost', data)
            .then((res) => {
                setPostData(res.data)
            })
            .catch((err) => console.log(err))
    }, [postID])

    const [newLiked, setNewLiked] = useState(false)

    function handleLike() {
        const data = {
            userId: id,
            postId: postID
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

    function handleComment(e) {
        e.preventDefault()
    
        const data = {
            postID: postID,
            userID: id,
            content: commentContent.current.value
        }
    
        axios.post('/api/addcomment', data)
            .then((res) => {
                if(res.data.msg === 'login') {
                    window.location.replace('/login')
                } else {
                    window.location.reload()
                }
            })
            .catch((err) => console.log(err))
    }

    return (
        <article className="post">
            <div className="post-land" style={{backgroundImage: `url(/${postData.background})`}}>
                <div className="overlay"></div>
                <h1>{postData.headline}</h1>
            </div>
            <div className="post-desc">
                <div className="post-content container">
                    <div className="post-info">
                        <h4 className="gold">{postData.category} </h4>
                        <span className="muted">{postData.date}</span>
                    </div>
                    <div className="actual-content">
                        <pre>{postData.content}</pre>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                        <span className={newLiked ? 'gold' : ''}>
                            <i className="fa fa-thumbs-up" style={{cursor: 'pointer'}} onClick={handleLike}></i>
                            <span> {newLiked || liked ? postData.likes - 1 : 'Like'}</span>
                        </span>
                    </div>
                    <div className="comments">
                        <h2>Comments: { postData.comments ? postData.comments.length : 0 }</h2>
                        { postData.comments ? 
                        postData.comments.map((comment, index) => (
                            <div className="comment" key={index}>
                                <div className="comment-sender">
                                    <span className="gold comment-sender-name">{comment.name}</span>
                                    <span className="muted comment-sender-date">{comment.date}</span>
                                </div>
                                <div className="comment-content">
                                    <p>{comment.content}</p>
                                </div>
                            </div>
                        ))    
                        : <></>}
                    </div>
                    <form onSubmit={handleComment}>
                        <input type="text" placeholder="Write a comment" required ref={commentContent} />
                        <input type="submit" value="COMMENT" className="sign-up" />
                    </form>
                </div>
            </div>
        </article>
    )
}
