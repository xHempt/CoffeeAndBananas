import React from 'react'

export default function PreviewPost({ post }) {
    return (
        <div className="preview-post">
            <div className="preview-post-category">
                {post.category}
            </div>
            <div className="preview-post-headline">
                <h1>
                    {post.headline}    
                </h1>
            </div>
            <div className="preview-post-date">
                {post.date}
            </div>
            <div className="preview-post-content">
                {post.content}
            </div>
        </div>
    )
}
