import React from 'react';


const ClosetItem = (props) => {

    return (<div>
        <div className="container">
            <div className="row">
                <div className="col-12 col-sm-8 col-md-6 col-lg-4">
                    <div className="card">
                        <img className="card-img" src={props.item.url} alt={props.item.classification[props.item.classIndex]} />
                        <div className="card-img-overlay">
                            <a href="#" className="btn btn-light btn-sm">Add to Pack</a>
                        </div>
                        <div className="card-body">
                            <h2 className="card-title">{props.item.classification[props.item.classIndex]}</h2>
    <p className="card-text">Suitable for: </p>
                            <a href="#" className="btn btn-info">Item Detail</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>)
}

export default ClosetItem;