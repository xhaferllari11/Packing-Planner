import React from 'react';
import ClosetItem from '../../components/ClosetItem/ClosetItem';
import './ClosetPage.css';

import Upload from '../../components/Upload/Upload';

const ClosePage = (props) => {

    return (
        <section className='closet-page'>
            <h1 className='closet-title'>Closet</h1>
            <Upload addItem={props.addItem}/>

            <h3>Current Closet</h3>
            <div className='closet-container'>
                <div className='closet-items-container'>
                    {props.items.map((item, ind) =>
                        <ClosetItem item={item} key={ind} />
                    )}
                </div>

            </div>
        </section>
    )
}

export default ClosePage;