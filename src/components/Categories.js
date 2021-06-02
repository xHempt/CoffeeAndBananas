import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import PreviewPost from './PreviewPost'

export default function Categories({ id, likes }) {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    const categoryName = urlParams.get("name")
    const catName = categoryName.replace(/-/g, ' ')

    const [posts, setPosts] = useState([])

    const getPostsWithCat = useCallback(() => {
        const data = {
            category: catName
        }

        axios.post('/api/getpostswithcat', data)
            .then((res) => setPosts(res.data))
            .catch((err) => console.log(err))
    }, [catName])

    useEffect(() => {
        getPostsWithCat()
    }, [catName, getPostsWithCat])
    return (
        <div className="category-posts">
            {posts.map((post, index) => (<PreviewPost post={post} key={index} id={id} liked={ likes.includes(post._id) ? true : false } />))}
        </div>
    )
}
