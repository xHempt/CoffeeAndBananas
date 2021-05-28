import React from 'react'

export default function About() {
    return (
        <section className="about" id="about">
            <div className="card-container">
                <div className="about-card-img" />
                <div className="about-card-desc">
                    <div className="about-me">
                        <h1>Hi, I'm <span className="gold">David!</span></h1>
                        <p>I’ve created this blog to share my story with self development, web development as well as some random thoughts with you guys. I hope you enjoy your stay here, and if you do make sure to sign up to get notified whenever i post something new in here! </p>
                        <p>You may be asking “What’s the deal with ,,coffee and bananas?"”. Well, you’ll learn through my posts. I know, it kinda looks weird but trust me, it’ll all make as you read through.</p>
                    </div>
                    <a href="#about" className="btn">READ MORE &#62;</a>
                </div>
            </div>
        </section>
    )
}
