import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MarsRover = () => {
    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        const fetchMarsPhotos = async () => {
            try {
                const response =  await axios.get("http://localhost:5000/mars");
                setPhotos(response.data.photos);
            } catch (error) {
                console.error('Error fetching Mars photos:', error);
            }
        };
        fetchMarsPhotos();
    }, []);

    return (
        <div>
            <h1>Mars Rover Photos</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap'}}>
                {photos.map((photo) => (
                    <img
                        key={photo.id}
                        src={photo.img_src}
                        alt={`Mars Rover Photo ${photo.id}`}
                        style={{ width: '200px', margin: '10px' }}
                    />
                ))}
            </div>
        </div>
    );
};

export default MarsRover;