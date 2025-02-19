import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";

const EPIC = () => {
  const [epicData, setEpicData] = useState([]);
  const [date, setDate] = useState("");
  const [error, setError] = useState(null);

  const fetchEPIC = async (selectedDate = "") => {
    try {
      const url = `http://localhost:5000/epic${
        selectedDate ? `?date=${selectedDate}` : ""
      }`;
      const response = await axios.get(url);
      setEpicData(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching EPIC data:", error);
      setError("Failed to fetch EPIC data. Please try again later.");
    }
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchEPIC(date);
  };

  useEffect(() => {
    fetchEPIC();
  }, []);

  return (
    <div className="container">
      <h1>Earth Polychromatic Imaging Camera (EPIC)</h1>
      <Form onSubmit={handleSubmit} className="mb-3">
        <Form.Group controlId="epicDate">
          <Form.Label>Select a Date (Optional)</Form.Label>
          <Form.Control
            type="date"
            value={date}
            onChange={handleDateChange}
            max={new Date().toISOString().split("T")[0]}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Fetch EPIC Images
        </Button>
      </Form>
      {error ? <p style={{ color: "red" }}>{error}</p> : null}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "10px",
        }}
      >
        {epicData.map((image) => (
          <div
            key={image.identifier}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            <img
              src={`https://epic.gsfc.nasa.gov/archive/natural/${image.date
                .split(" ")[0]
                .replace(/-/g, "/")}/png/${image.image}.png`}
              alt={`EPIC Image ${image.identifier}`}
              style={{ width: "100%", display: "block" }}
            />
            <p style={{ padding: "10px", margin: 0 }}>Date: {image.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EPIC;
