import React, { useState } from 'react'
import imageService from '../utils/imageService'


function UploadPage() {
    const [image, setImage] = useState('');
    const [loading, setLoading] = useState(false);
    const [classified, setClassified] = useState({});

    const uploadImage = async e => {
        const files = e.target.files;
        console.log('files', files);
        const data = new FormData();
        data.append('file', files[0]);
        data.append('upload_preset', 'PackingPlanner');
        console.log(data);
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
    }

    return (
        <>
            <h1>Upload Pic</h1>
            <input
                type='file'
                name='file'
                placeholder='upload image'
                onChange={uploadImage}
            />
            {loading ? (
                <h3>Loading file....</h3>
            )
                :
                (
                    <img
                        src={image}
                        style={{ width: '200px' }}
                        alt='img upload here'
                    />
                )
            }
            {(Object.entries(classified).length === 0 && classified.constructor === Object) ?
                <h1>Image not classified yet</h1>
                :
                {classified}
            }

        </>
    )
}

export default UploadPage;