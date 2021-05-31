import React from 'react'
import NewPostForm from './NewPostForm'
import { Link, withRouter } from 'react-router-dom'

export default withRouter(function AddPost({ op }) {

    return (op === '1' ? 
        <div className="new-post">
            <NewPostForm />
        </div>
        : 
        <div className="access-denied">
            <h1>Sorry, but you don't have the premision to do that :/</h1>
            <Link to="/" className="err-popup">Back to home</Link>
        </div>
        )
})
