import React, { useState } from 'react';
import imageService from '../../utils/imageService';
import './Upload.css';
import { PromiseProvider } from 'mongoose';

const Upload = (props) => {
    const [image, setImage] = useState('');
    const [loading, setLoading] = useState(false);
    const [classified, setClassified] = useState({});

    const uploadImage = async e => {
        // this should all be in a try catch block
        const files = e.target.files;
        const data = new FormData();
        data.append('file', files[0]);
        data.append('upload_preset', 'PackingPlanner');
        setLoading(true);
        const res = await fetch(
            'https://api.cloudinary.com/v1_1/dytlxf7pc/image/upload',
            {
                method: 'POST',
                body: data
            }
        );
        const file = await res.json();
        setImage(file.secure_url);
        setLoading(false);
        const imgClassified = await imageService.create({ imgURL: file.secure_url });
        setClassified(imgClassified);
        props.addItem(imgClassified);
    }

    const imageStyle = {
        width: 200,
        display: image ? image : 'none',
        marginRight: 2,
        height: 'auto'
    }

    const handleClassificationClick = (ind) => {
        console.log(ind);
        // update the database with new index (index and img id))
        // update front end with it
    }

    return (
        <div className='upload-closet-pic-container'>
            <h4>Upload New Item</h4>
            <div className='upload-area'>
                <input
                    type='file'
                    name='file'
                    placeholder='upload image'
                    onChange={uploadImage}
                />
                <div className='image-info'>
                    {loading ? (
                        <h3>Loading....</h3>)
                        :
                        (<div className='uploaded-image-container'>
                            <img
                            src={image}
                            style={imageStyle}
                            alt='img upload here'
                        />
                        </div>)}
                    {(Object.entries(classified).length === 0 && classified.constructor === Object) ?
                        <h6 style={{ display: 'none' }}>Nothing uploaded</h6>
                        :
                        <table className="table table-striped classification-table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Classification</th>
                                    <th scope="col">Confidence</th>
                                    <th scope="col">Official</th>
                                </tr>
                            </thead>
                            <tbody>
                                {classified.classification.map((c, ind) =>
                                    (classified.confidence[ind] > .5) ?
                                        <tr key={ind}>
                                            <th scope="row">{ind}</th>
                                            <td>{c}</td>
                                            <td>{classified.confidence[ind]}</td>
                                            <td><button
                                                type="button"
                                                className="btn btn-default btn-sm"
                                                onClick={() => handleClassificationClick(ind)}>
                                                {(ind === classified.classIndex) ?
                                                    'yes' : 'no'}
                                            </button></td>
                                        </tr>
                                        :
                                        <tr key={ind}></tr>
                                )}
                            </tbody>
                        </table>
                    }
                </div>
            </div>
        </div>
    )
}

export default Upload;