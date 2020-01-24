import React from 'react';
import {Link} from 'react-router-dom';


const TripsIndex = (props) => {

    function getRandImage(num){
        // import img from '../../images/touristSites/1.jpeg'
    }

    return (
        <div className="trips-container">
            {props.trips.map((t, ind) =>
                <div key={ind} className="col-lg-4 col-sm-6 mb-3">
                    <div className="card h-100">
                        <Link to={`/trips/${t._id}`}>
                            <img className="card-img-top" src={`../../images/touristSites/2.jpeg`} alt="" />
                        </Link>
                        <div className="card-body">
                            <h4 className="card-title">
                                <p>Trip to {t.destination} on {t.date}</p>
                                <p>{t.duration} days</p>
                                <div></div>
                                <Link className='btn btn-primary' to={`/trips/${t._id}`}>Detail</Link>
                            </h4>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
};

export default TripsIndex;