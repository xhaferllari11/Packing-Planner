import React from 'react';
import { Link } from 'react-router-dom';
import './TripsIndex.css'
const image = require.context('../../images/touristSites', true);
const firtImg = image('./3.jpeg')


const TripsIndex = (props) => {

    function getRandImage() {
        let randNum = 1 + Math.floor(Math.random() * 21);
        return image(`./${randNum}.jpeg`)

    }

    return (
        <div className="trips-container">
            {props.trips.map((t, ind) =>
                <div key={ind} className="trip-card-container">
                    <Link to={`/trips/${t._id}`}>
                        <div
                            className="trip-card-image-container"
                            style={{
                                backgroundImage: `url(${getRandImage()})`,
                            }}
                        ></div>
                    </Link>
                    <div className="card-body">
                        <div className="card-title">
                            <h3 className='actual-duration-trip'>{t.date}</h3>
                            <p className='actual-destination-trip'>{t.destination}</p>
                            <p className='actual-duration-trip'>{t.duration} days</p>
                            <div></div>
                            <Link className='btn btn-primary' to={`/trips/${t._id}`}>Detail</Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
};

export default TripsIndex;