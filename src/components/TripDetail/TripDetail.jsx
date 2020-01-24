import React from 'react';
import Weather from '../Weather/Weather';
import ClosetItem from '../ClosetItem/ClosetItem';
import './TripDetail.css'

const TripDetail = (props) => {
    return (<div className='trip-detail-whole-page'>
        <h4>{props.trip.destination} on {props.trip.date}</h4>
        <h5>Pack Suggested:</h5>
        <div className='closet-item-container-trip-detail'>
            {props.trip.suggestedItems.map((item, ind) =>
                <ClosetItem item={item} key={ind} />)}
        </div>
        <h5>Based on this weather:</h5>
        <Weather weather={props.trip.weather} />
    </div>)
}

export default TripDetail;