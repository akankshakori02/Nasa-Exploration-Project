import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import "../index.css";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import LoadSpinner from "./LoadSpinner";

const APOD = () => {
  // State to hold APOD data, selected date for fetching APOD and errors during fetch if any.
  const [apodData, setApodData] = useState(null);
  const [date, setDate] = useState("");
  const [error, setError] = useState(null);

  // Handler to change date in date picker
  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  // Handler to fetch data based on selected date
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchAPOD(date);
  };

  const fetchAPOD = async (selectedDate = "") => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/apod${
        selectedDate ? `?date=${selectedDate}` : ""
      }`;
      const response = await axios.get(url);
      setApodData(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching APOD data:", error);
      setError("Failed to fetch APOD data. Please try again later.");
    }
  };

  useEffect(() => {
    fetchAPOD();
  }, []);

  return (
    <div>
      {error ? (
        <p className="set-error center">{error}</p>
      ) : apodData ? (
        <div className="container">
          <h2>Astronomy Picture of the Day</h2>
          <Form onSubmit={handleSubmit} className="mb-3 mx-2">
            <Form.Group controlId="apodDate">
              <Form.Label>
                {" "}
                <b>Select a Date</b>
              </Form.Label>
              {/* <p>Images before 20-June-1995 are not available</p> */}
              <Form.Control
                type="date"
                placeholder="dd/mm/yyyy"
                className="form-width"
                value={date}
                onChange={handleDateChange}
                max={new Date().toISOString().split("T")[0]}
              />
            </Form.Group>
            <Button className="my-1 btn-sm" variant="dark" type="submit">
              Fetch Images
            </Button>
          </Form>
          {error ? <p className="set-error center">{error}</p> : null}
          <Card className="box bg-dark text-white p-md-1 ms-2">
            <Card.Img src={apodData.url} alt={apodData.title} />
            <Card.ImgOverlay>
              <Card.Title>{apodData.title}</Card.Title>
            </Card.ImgOverlay>
            <Card.Text className="box bg-dark text-white m-2 text-justify">
              {apodData.explanation}
            </Card.Text>
          </Card>
        </div>
      ) : (
        <LoadSpinner />
      )}
    </div>
  );
};

export default APOD;
