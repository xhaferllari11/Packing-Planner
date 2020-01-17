import React, { useState } from 'react'


function UploadPage() {
    const [image, setImage] = useState('');
    const [loading, setLoading] = useState(false);

    const uploadImage = async e => {
        const files = e.target.files;
        console.log('files',files);
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
        console.log(file);
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
                    <img src={image} style={{width:'200px'}} />
                )
            }
        </>
    )
}

export default UploadPage;