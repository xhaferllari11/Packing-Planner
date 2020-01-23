import React, { useState } from 'react';
import imageService from '../../utils/imageService';
import './Upload.css';

const Upload = () => {
    const [image, setImage] = useState('');
    const [loading, setLoading] = useState(false);
    const [classified, setClassified] = useState({});

    const uploadImage = async e => {
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
        console.log(file.secure_url);
        const imgClassified = await imageService.create({ imgURL: file.secure_url });
        console.log('ctype', imgClassified);
        setClassified(imgClassified)
    }

    const imageStyle = {
        width: 200,
        display: image ? image : 'none',
        marginRight: 2
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
                        <h3>Loading....</h3>
                    ) : (
                            <img
                                src={image}
                                style={imageStyle}
                                alt='img upload here'
                            />
                        )}
                    {(Object.entries(classified).length === 0 && classified.constructor === Object) ?
                        <h6 style={{display: 'none'}}>Nothing uploaded</h6>
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
                                {classified.classification.map((c,ind)=> 
                                (classified.confidence[ind]>.5) ?
                                <tr key={ind}>
                                    <th scope="row">{ind}</th>
                                    <td>{c}</td>
                                    <td>{classified.confidence[ind]}</td>
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