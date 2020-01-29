import React from 'react'

import SignInPage from '../SignInPage/SignInPage';
import './HomePage.css';

const HomePage = (props) => {

    return (<div className='home-page-container-big'>
        <h1 className='home-title'>Welcome</h1>
        <section className='home-page-container'>
            <div className='signin-box'>
                {(props.user) ?
                    <div></div>
                    :
                    <SignInPage 
                        handleSignIn={props.handleSignIn}
                        history={props.history}
                    />
                }
            </div>
        </section>
    </div>)
}

export default HomePage;