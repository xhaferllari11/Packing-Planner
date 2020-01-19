import React from 'react'
import './ClosetPage.css';

import Upload from '../../components/Upload/Upload';

const ClosePage = () => {



    return (
        <section className='closet-page'>
            <h1>Closet</h1>
            <Upload />

            <h3>All your closet items</h3>

        </section>
    )
}

export default ClosePage;