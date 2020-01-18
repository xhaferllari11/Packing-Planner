
import React from 'react'
import { Link } from 'react-router-dom'


const NavBar = () => {


    return (
        <>
            <Link to='/' className='btn btn-primary'>Home</Link>
            <Link to='/dashboard' className='btn btn-primary'>Dashboard</Link>
            <Link to='/closet' className='btn btn-primary'>Closet</Link>
            <Link to='/signup' className='btn btn-primary'>Sign Up</Link>

        </>
    )
}

export default NavBar;


