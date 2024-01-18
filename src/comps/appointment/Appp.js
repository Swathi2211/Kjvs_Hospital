import React, { useState } from 'react';

const Appp = () => {
    const [photo, setPhoto] = useState(null);

    const handlePhotoUpload = (event) => {
        const file = event.target.files[0];

        if (file) {
            const photoUrl = URL.createObjectURL(file);
            setPhoto(photoUrl);

            // Log the photo URL to the console
            console.log('Uploaded photo URL:', photoUrl);
        }
    };

    const handleIconClick = () => {
        document.getElementById('fileInput').click();
    };

    return (
        <div style={{ marginLeft: "940px", marginTop: "-70px" }}>
            <input
                type="file"
                id="fileInput"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handlePhotoUpload}
            />
            <div
                style={{
                    width: '180px',
                    height: '200px',
                    border: '2px solid #ccc',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative',
                }}
            >
                {!photo ? (
                    <div>
                        <i
                            className="fa-solid fa-upload"
                            onClick={handleIconClick}
                            style={{ cursor: 'pointer', position: 'absolute', marginLeft: "60px", fontSize: "20px", marginTop: "70px" }}
                        ></i>
                        <p id="barlow" style={{ marginTop: "140px", marginLeft: "10px" }}>Upload your photo</p>
                    </div>
                ) : (
                    <img
                        src={photo}
                        alt={`uploaded-passport`}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                )}
            </div>
        </div>
    );
};

export default Appp;
