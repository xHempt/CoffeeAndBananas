import React, { useRef } from 'react'
import search from '../media/lupa.svg'
import { Link, withRouter } from 'react-router-dom'

export default withRouter(function Header({ name, onLogout, op }) {
    const searchContent = useRef('')

    function logOut() {
        onLogout('')
        window.location.reload()
    }

    function handleSearch(e) {
        e.preventDefault()
        window.location.assign(`/search/?content=${searchContent.current.value}`)
    }

    return (
        <header>
            <nav>
                <ul>
                    <li>
                        <Link to="/"><i className="fa fa-home"></i></Link>
                    </li>
                    <li>
                        <Link to="/category/?name=Self-Development">Self Development</Link>
                    </li>
                    <li>
                        <Link to="/category/?name=Time-Management">Time Management</Link>
                    </li>
                    <li>
                        <Link to="/category/?name=Web-Development">Web Development</Link>
                    </li>
                    <li>
                        <Link to="/category/?name=Tutorial">Tutorials</Link>
                    </li>
                    <li>
                        <Link to="/category/?name=Top">TOP</Link>
                    </li>
                </ul>
                <ul>
                    <li>
                        <form onSubmit={handleSearch}>
                            <button type="submit">
                                <img src={search} alt="" />
                            </button>
                            <input type="text" required placeholder="Search" ref={searchContent} />
                        </form>
                    </li>
                        { name 
                        ?   <>
                                { op === '1' ? 
                                <li>
                                    <Link to="/addpost" className="gold">+</Link>
                                </li> 
                                : <></> }
                                <li>
                                    <p>Hello <span className="gold">{name}</span>!</p>
                                </li>
                                <li>
                                    <button onClick={logOut}>LOG OUT</button>
                                </li>
                            </>
                        : 
                        <>
                            <li>
                                <Link to="/login">LOG IN</Link>
                            </li>
                            <li>
                                <Link to="/register" id="sign-up">SIGN UP</Link>
                            </li>
                        </>
                        }
                </ul>
            </nav>
        </header>
    )
})
