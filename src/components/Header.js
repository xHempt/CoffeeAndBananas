import React from 'react'
import search from '../media/lupa.svg'
import { Link, withRouter } from 'react-router-dom'

export default withRouter(function Header({ name, onLogout, op }) {
    function logOut() {
        onLogout('')
        window.location.reload()
    }

    return (
        <header>
            <nav>
                <ul>
                    <li>
                        <Link to="/"><i className="fa fa-home"></i></Link>
                    </li>
                    <li>
                        <Link to="/category/self-development">Self Development</Link>
                    </li>
                    <li>
                        <Link to="/category/time-management">Time Management</Link>
                    </li>
                    <li>
                        <Link to="/category/web-development">Web Development</Link>
                    </li>
                    <li>
                        <Link to="/category/tutorials">Tutorials</Link>
                    </li>
                    <li>
                        <Link to="/category/top">TOP</Link>
                    </li>
                </ul>
                <ul>
                    <li>
                        <form>
                            <button type="submit">
                                <img src={search} alt="" />
                            </button>
                            <input type="text" required placeholder="Search" />
                        </form>
                    </li>
                    { name 
                    ?   <>
                            { op === '1' ? 
                            <>
                                <li>
                                    <Link to="/addpost" className="gold">+</Link>
                                </li>
                            </> 
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
