import React, { useState } from 'react'
import axios from 'axios'

export default function NewPostForm() {
    const [category, setCategory] = useState('Self Development')
    const [headline, setHeadline] = useState('')
    const [content, setContent] = useState('')
    const [background, setBackground] = useState(null)

    function handleCatChange(e) {
        setCategory(e.target.value)
    }

    function handleTitleChange(e) {
        setHeadline(e.target.value)
    }

    function handleContentChange(e) {
        setContent(e.target.value)
    }

    function handleBackgroundChange(e) {
        setBackground(e.target.files[0])
        console.log(background)
    }

    function handlePost(e) {
        e.preventDefault()

        const fd = new FormData()
        fd.append('file', background)
        
        const data = {
            category: category,
            headline: headline,
            content: content
        }

        const statebody = Object.assign({}, data)
        
        fd.append('data', JSON.stringify(statebody))

        axios.post('/api/post', fd)
            .then(() => window.location.replace('/'))
            .catch((err) => console.log(err));

        axios.post('/api/sendmail', data)
            .then(() => console.log('Emails sent!'))
            .catch((err) => console.log(err))
    }

    console.log(background)

    return (
        <>
            <form onSubmit={handlePost} className="post-form">
                <label htmlFor="category">
                    Choose a category:
                </label>
                <select name="category" id="category" onChange={handleCatChange} value={category}>
                        <option value="Self Development">Self Development</option>
                        <option value="Time Management">Time management</option>
                        <option value="Web Development">Web Development</option>
                        <option value="Tutorial">Tutorial</option>
                </select>
                <label htmlFor="background">
                    Choose a post background:
                </label>
                <input type="file" accept="image/jpg, image/jpeg, image/png, image/PNG" onChange={handleBackgroundChange}/>
                <label htmlFor="headline">
                    Title:
                </label>
                <input type="text" name="headline" required onChange={handleTitleChange} value={headline} />
                <label htmlFor="content">
                    Content:
                </label>
                <textarea name="content" id="content" style={{ resize: 'none' }} required onChange={handleContentChange} cols="30" rows="10" value={content}></textarea>
                <button type="submit">POST</button>
            </form>
        </>
    )
}
