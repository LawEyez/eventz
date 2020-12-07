import React from 'react'
import { NavLink, Link } from 'react-router-dom'

import AuthContext from '../../context/authContext'

const SideNav = () => {
    return (
        <AuthContext.Consumer>
            {context => (
                <div className="side-nav">
                    <div className="menu">
                        <span className="bar-1"></span>
                        <span className="bar-2"></span>
                    </div>
                    {context.token && (
                        <ul className="side-nav-ul authenticated">
                            <li className="side-nav-li">
                                <Link>
                                    <i className="lni lni-facebook side-icon"></i>
                                </Link>
                            </li>
                            <li className="side-nav-li">
                                <Link>
                                    <i className="lni lni-twitter side-icon"></i>
                                </Link>
                            </li>
                            <li className="side-nav-li">
                                <Link>
                                    <i className="lni lni-instagram side-icon"></i>
                                </Link>
                            </li>
                            <li className="side-nav-li">
                                <Link>
                                    <i className="lni lni-linkedin side-icon"></i>
                                </Link>
                            </li>
                        </ul>
                    )}

                    {!context.token && (
                        <div className="side-nav-info">
                            <p>allenojuka10@gmail.com</p>
                            <p>(+254) 711 383 990</p>
                        </div>
                    )}

                    {!context.token && (
                        <ul className="side-nav-ul">
                            <li className="side-nav-li">
                                <Link>
                                    <i className="lni lni-facebook side-icon"></i>
                                </Link>
                            </li>
                            <li className="side-nav-li">
                                <Link>
                                    <i className="lni lni-twitter side-icon"></i>
                                </Link>
                            </li>
                            <li className="side-nav-li">
                                <Link>
                                    <i className="lni lni-instagram side-icon"></i>
                                </Link>
                            </li>
                            <li className="side-nav-li">
                                <Link>
                                    <i className="lni lni-linkedin side-icon"></i>
                                </Link>
                            </li>
                        </ul>
                    )}
                    
                </div>
            )}
        </AuthContext.Consumer>
    )
}

export default SideNav