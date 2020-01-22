import React from 'react';
import Weather from '../Weather/Weather';
import ClosetItem from '../ClosetItem/ClosetItem';
import './TripDetail.css'

const TripDetail = (props) => {
    return (<>
        <h4>To {props.trip.destination} on {props.trip.createdAt}</h4>
        <h5>Pack Suggested:</h5>
        {/* styling for closet items container is in dashborad style */}
        <div className='closet-item-container'>
            {props.trip.suggestedItems.map((item, ind) =>
                <ClosetItem item={item} key={ind} />)}
        </div>
        <h5>Based on this weather:</h5>
        <Weather weather={props.trip.weather}/>
    </>)
}

export default TripDetail;