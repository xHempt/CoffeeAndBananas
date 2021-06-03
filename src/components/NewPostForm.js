import React, { useState, useRef } from 'react'
import axios from 'axios'

export default function NewPostForm() {
    const [category, setCategory] = useState('Self Development')
    const [headline, setHeadline] = useState('')
    const [content, setContent] = useState('')
    const [background, setBackground] = useState(null)
    const [selectedDate, setSelectedDate] = useState('now')
    const selectedTime = useRef(new Date())
    
    
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
    }
    
    function handleDateChange(e) {
        setSelectedDate(e.target.value)
    }
    
    function testTime() {
        console.log('siema')
    }
    
    function handlePost(e) {
        e.preventDefault()

        const date = new Date(selectedTime.current.value)
        const time = (date.getTime() - Date.now())
        
        const fd = new FormData()
        fd.append('file', background)
        
        const data = {
            category: category,
            headline: headline,
            content: content,
            selectedDate: selectedDate,
            timeoutValue: time
        }
        
        const statebody = Object.assign({}, data)
        
        fd.append('data', JSON.stringify(statebody))
        
        axios.post('/api/post', fd)
            .then(() => window.location.replace('/'))
            .catch((err) => console.log(err));
    }

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
                <label>When do you want to post it?</label>
                <select onChange={handleDateChange}>
                    <option value="now">NOW</option>
                    <option value="date">CHOOSE A DATE AND TIME</option>
                </select>
                { selectedDate === 'date' ? 
                <>
                    <input type="datetime-local" name="time" ref={selectedTime} placeholder="SET TIME" />
                    <button onClick={testTime}>TEST</button>
                </>
                : <></>
                }
                <button type="submit" className="sign-up">POST</button>
            </form>
        </>
    )
}
