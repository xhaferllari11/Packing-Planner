import React from 'react'

import SignInPage from '../SignInPage/SignInPage';
import './HomePage.css';

const HomePage = () => {

    return (
        <div className='home-page-container-big'>
            <h1 className='home-title'>Welcome</h1>
            <section className='home-page-container'>
               
                <div className='signin-box'>
                    <SignInPage />
                </div>
            </section>
        </div>
    )
}

export default HomePage;