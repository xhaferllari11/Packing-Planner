import React from 'react'

import SignInPage from '../SignInPage/SignInPage';
import './HomePage.css';

const HomePage = (props) => {

    return (<div className='home-page-container-big'>
        {(props.user) ?
            <div></div>
            :
            <SignInPage
                handleSignIn={props.handleSignIn}
                history={props.history}
            />
        }
    </div>)
}

export default HomePage;