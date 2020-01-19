import React from 'react'

import SignInPage from '../SignInPage/SignInPage';
import './HomePage.css';

const HomePage = () => {

    return (
        <>
            <h1 style={{paddingBottom: '5%'}}>This is home page</h1>
            <section className='home-page-container'>
                <div className='vaca-pics'>
                    Pics Here
                </div>
                <div className='signin-box'>
                    <SignInPage />
                </div>
            </section>
        </>
    )
}

export default HomePage;