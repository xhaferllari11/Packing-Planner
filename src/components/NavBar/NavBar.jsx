
import React from 'react'
import { Link } from 'react-router-dom'


const NavBar = () => {


    return (
        <>
            <nav className="navbar navbar-dark bg-primary">
                <Link to='/' className='btn btn-primary'>Home</Link>
                <Link to='/dashboard' className='btn btn-primary'>Dashboard</Link>
                <Link to='/closet' className='btn btn-primary'>Closet</Link>
                <Link to='/signup' className='btn btn-primary'>Sign Up</Link>
                <Link to='/signin' className='btn btn-primary'>Sign In</Link>
                <Link to='/signout' className='btn btn-primary'>Sign Out</Link>
            </nav>

        </>
    )
}

export default NavBar;


