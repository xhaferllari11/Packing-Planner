import React from 'react'

import SignInPage from '../SignInPage/SignInPage';
import './HomePage.css';
import Footer from '../../components/Footer/Footer';


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
        <Footer />
    </div>)
}

export default HomePage;