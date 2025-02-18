import React, { useEffect, useState } from 'react';
import axios from 'axios';

const APOD = () => {
    const [apodData, setApodData] = useState(null);

    useEffect(() => {
        const fetchAPOD = async () => {
            try {
                const response = await axios.get('http://localhost:5000/apod');
                setApodData(response.data);
            } catch (error) {
                console.error('Error fetching APOD data:', error);
            }
        };
        fetchAPOD();
    }, []);

    return (
        <div>
            {apodData ? (
                <div>
                    <h1>{apodData.title}</h1>
                    <img src={apodData.url} alt={apodData.title} />
                    <p>{apodData.explanation}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default APOD;