import React from 'react'
import { NavLink } from 'react-router-dom'

import AuthContext from '../../context/authContext'

const Navbar = props => (
    <AuthContext.Consumer>
        {context => (
            <header>
                <nav>
                    <div className="">
                        <NavLink to='/' className='nav-brand'>
                            ev<span className="flip-h">e</span><span className="flip-h">n</span>tz
                            </NavLink>
                    </div>
        
                    <ul className="nav-ul">
                        {!context.token && (
                        <li className="nav-li">
                            <NavLink to='/signup' className='nav-link'>Signup</NavLink>
                        </li>)}
                        {!context.token && (
                        <li className="nav-li">
                            <NavLink to='/login' className='nav-link'>Login</NavLink>
                        </li>)}
                        <li className="nav-li">
                            <NavLink to='/events' className='nav-link'>Events</NavLink>
                        </li>
                        {context.token && (
                            <React.Fragment>
                                <li className="nav-li">
                                    <NavLink to='/bookings' className='nav-link'>Bookings</NavLink>
                                </li>
                                <li className="nav-li">
                                    <button className='nav-link' onClick={context.logout}>Logout</button>
                                </li>
                            </React.Fragment>
                        )}
                    </ul>
                </nav>
            </header>
        )}
    </AuthContext.Consumer>
)

export default Navbar