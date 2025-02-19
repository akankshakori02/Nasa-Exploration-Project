import React, { useEffect, useState } from "react";
import { Spinner, Card } from "react-bootstrap";
import '../index.css'
import axios from "axios";

const APOD = () => {
  const [apodData, setApodData] = useState(null);

  useEffect(() => {
    const fetchAPOD = async () => {
      try {
        const response = await axios.get("http://localhost:5000/apod");
        setApodData(response.data);
      } catch (error) {
        console.error("Error fetching APOD data:", error);
      }
    };
    fetchAPOD();
  }, []);

  return (
    <div>
      {apodData ?
      (<div className="container">
            <h1>Astronomy Picture of the Day</h1>
          <Card className="box bg-dark text-white p-md-1 ms-2" >
          <Card.Img src={apodData.url} alt={apodData.title} thumbnail />
          <Card.ImgOverlay>
          <Card.Title>{apodData.title}</Card.Title>
          </Card.ImgOverlay>
          <Card.Text className="box bg-dark text-white m-2" style={{textAlign:'justify'}}>
            {apodData.explanation}
            </Card.Text>
        </Card>
      
        </div>) 
        
    : (
        <Spinner animation="grow" style={{ position: 'absolute', top: '50%'}} />
      )}
    </div>
  );
};

export default APOD;