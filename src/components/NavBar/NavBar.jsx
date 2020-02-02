
import React from 'react'
import { Link } from 'react-router-dom'
import './NavBar.css';

const NavBar = (props) => {

    return (<nav className="navbar navbar-dark bg-primary navigation-main">
        <Link to='/' className='btn btn-primary navbar-brand'>PackingPlanner</Link>
        {(props.user) ?
            <div className='nav-bar-links'>
                <Link to='/dashboard' className='btn btn-primary'>Dashboard</Link>
                <Link to='/trips' className='btn btn-primary'>Trips</Link>
                <Link to='/closet' className='btn btn-primary'>Closet</Link>
                <span className='navbar-text'>
                    <Link to='/' className='btn btn-primary'
                        onClick={() => props.handleSignOut()}
                    >Sign Out</Link>
                </span>
            </div>
            :
            <div>
                <Link to='/signup' className='btn btn-primary'>Sign Up</Link>
                <Link to='/signin' className='btn btn-primary'>Sign In</Link>
            </div>
        }
    </nav>)
}

export default NavBar;


