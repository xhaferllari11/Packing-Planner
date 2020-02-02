import React from 'react';
import Weather from '../Weather/Weather';
import ClosetItem from '../ClosetItem/ClosetItem';
import './TripDetail.css'

const TripDetail = (props) => {
    console.log(props.trip)
    return (<div className='trip-detail-whole-page'>
        <h2>{props.trip.destination} on {props.trip.date ? props.trip.date.slice(0, 10) : ''}</h2>
        <hr/>
        <p>Pack Suggested:</p>
        <div className='closet-item-container-trip-detail'>
            {props.trip.suggestedItems.map((item, ind) =>
                <ClosetItem item={item} key={ind} />)}
        </div>
        <hr/>
        <h5>Based on this weather:</h5>
        <Weather weather={props.trip.weather} />
    </div>)
}

export default TripDetail;