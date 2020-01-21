import React from 'react';
import ClosetItem from '../../components/ClosetItem/ClosetItem';
import './ClosetPage.css';

import Upload from '../../components/Upload/Upload';

const ClosePage = (props) => {

    return (
        <section className='closet-page'>
            <h1>Closet</h1>
            <Upload />

            <h3>All your closet items</h3>
            {props.items.map( (item,ind) => 
            <ClosetItem item={item} key={ind}/>
            )}
        </section>
    )
}

export default ClosePage;