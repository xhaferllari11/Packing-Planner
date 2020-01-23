import React from 'react';
import './ClosetItem.css';

const ClosetItem = (props) => {

    return (
            <div className="item-card">
                <img className="card-img" src={props.item.url} alt={props.item.classification[props.item.classIndex]} />
                <div className="card-body">
                    <p className="card-title">{props.item.classification[props.item.classIndex]}</p>
                    <a href="#" className="btn btn-primary">Detail</a>
                </div>
        </div>
        )
}

export default ClosetItem;