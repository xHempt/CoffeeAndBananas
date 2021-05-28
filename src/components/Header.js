import React from 'react'
import search from '../media/lupa.svg'
import { Link, withRouter } from 'react-router-dom'

export default withRouter(function Header({ name, onLogout }) {
    function logOut() {
        onLogout('')
        window.location.reload()
    }

    return (
        <header>
            <nav>
                <ul>
                    <li>
                        <a href="#about">Self Development</a>
                    </li>
                    <li>
                        <a href="#about">Time Management</a>
                    </li>
                    <li>
                        <a href="#about">Web Development</a>
                    </li>
                    <li>
                        <a href="#about">Tutorials</a>
                    </li>
                    <li>
                        <a href="#about">TOP</a>
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
