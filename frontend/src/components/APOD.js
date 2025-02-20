import React, { useEffect, useState } from "react";
import { Spinner, Card } from "react-bootstrap";
import '../index.css'
import axios from "axios";
import { Form, Button } from "react-bootstrap";

const APOD = () => {
  const [apodData, setApodData] = useState(null);
  const [date, setDate] = useState("");
  const [error, setError] = useState(null);

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchAPOD(date);
  };

  const fetchAPOD = async (selectedDate = "") => {
    try {
      const url = `http://localhost:5000/apod${
        selectedDate ? `?date=${selectedDate}` : ""
      }`;
      const response = await axios.get(url);
      setApodData(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching APOD data:", error);
    }
  };

  useEffect(() => {
    fetchAPOD();
  }, []);

  return (
    <div>
      {apodData ?
      (<div className="container">
            <h2>Astronomy Picture of the Day</h2>
            <Form onSubmit={handleSubmit} className="mb-3">
        <Form.Group controlId="apodDate">
          <Form.Label>Select a Date (Optional)</Form.Label>
          <p>Images before 20-June-1995 are not available</p>
          <Form.Control
            type="date"
            value={date}
            onChange={handleDateChange}
            max={new Date().toISOString().split("T")[0]}
            style={{width:'24%'}}
          />
        </Form.Group>
        <Button className="my-1" variant="primary" type="submit">
          Fetch APOD Images
        </Button>
      </Form>
      {error ? <p style={{ color: "red" }}>{error}</p> : null}
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
        <Spinner animation="grow" style={{ position: 'absolute', top: '50%', right:'50%'}} />
      )}
    </div>
  );
};

export default APOD;