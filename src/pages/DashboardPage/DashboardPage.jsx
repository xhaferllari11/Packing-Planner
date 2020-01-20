import React from "react";
import DestinationInput from '../../components/DestinationInput/DestinationInput';
import Weather from '../../components/Weather/Weather';

const DashboardPage = (props) => {
    console.log('props.',props);

    return (
        <>
            <DestinationInput/>
            <Weather />
        </>
            )
}

export default DashboardPage;