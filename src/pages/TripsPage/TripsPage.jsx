import React from 'react';
import { Route, Switch } from "react-router-dom";
import TripsIndex from '../../components/TripsIndex/TripsIndex';
import TripsDetail from '../../components/TripDetail/TripDetail';
import Footer from '../../components/Footer/Footer';

import './TripsPage.css'

const TripsPage = (props) => {

    return (<section className='trips-page'>
        <h1 className='trips-title-trip'>Trips</h1>
        <TripsIndex
            {...props}
            history={props.history}
            user={props.user}
        />
        <Footer />
    </section>)
}

export default TripsPage;