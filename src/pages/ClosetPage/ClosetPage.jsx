import React from 'react';
import ClosetItem from '../../components/ClosetItem/ClosetItem';
import './ClosetPage.css';
import Footer from '../../components/Footer/Footer';

import Upload from '../../components/Upload/Upload';

const ClosePage = (props) => {

    return (
        <section className='closet-page'>
            <h1 className='closet-title'>Closet</h1>
            <hr/>
            <Upload addItem={props.addItem} />
            <hr/>
            <p style={{color: 'navy'}}>Current Closet</p>
            <div className='closet-container'>
                <div className='closet-items-container'>
                    {props.items.map((item, ind) =>
                        <ClosetItem item={item} key={ind} />
                    )}
                </div>
            </div>
            <Footer />
        </section>
    )
}

export default ClosePage;