import React from 'react';
import './ClosetItem.css';

const ClosetItem = (props) => {

    return (
            <div className="item-card">
                <img className="card-img" src={props.item.url} alt={props.item.classification[props.item.classIndex]} />
                <div className="card-body">
                    <h2 className="card-title">{props.item.classification[props.item.classIndex]}</h2>
                    <p className="card-text">Suitable for: </p>
                    <a href="#" className="btn btn-info">Item Detail</a>
                    <a href="#" className="btn-small btn btn-info">Remove</a>
                </div>
        </div>
        )
}

export default ClosetItem;