import React, { useState, useEffect } from "react";
import {
  DropdownButton,
  Dropdown,
  Container,
  Row,
  Col,
  Spinner,
} from "react-bootstrap";
import "../index.css";
import { LazyLoadImage } from "react-lazy-load-image-component";

const EPIC = () => {
  // State to hold EPIC data & control the type of images displayed
  const [epicData, setImages] = useState(null);
  const [type, setType] = useState("natural");

  // Fetch images on type change
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/epic?type=${type}`)
      .then((response) => response.json())
      .then((data) => setImages(data))
      .catch((error) => console.error("Error fetching images:", error));
  }, [type]);

  return epicData ? (
    <Container>
      <Row>
        <Col md="auto">
          <h2>Earth Polychromatic Imaging Camera (EPIC)</h2>
        </Col>
        <Col>
          <DropdownButton
            className="mx-5 my-2"
            variant="dark"
            id="dropdown-basic-button"
            title={`Images: ${type.toUpperCase()}`}
          >
            <Dropdown.Item onClick={() => setType("natural")}>
              Natural
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setType("enhanced")}>
              Enhanced
            </Dropdown.Item>
          </DropdownButton>
        </Col>
      </Row>

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
            <LazyLoadImage
              style={{ width: "100%", display: "block" }}
              src={`https://epic.gsfc.nasa.gov/archive/${type}/${image.date
                .substring(0, 10)
                .replace(/-/g, "/")}/jpg/${image.image}.jpg`}
              alt={`EPIC Image ${image.identifier}`}
            />
            <div style={{ padding: "10px", background: "#f8f8f8" }}>
              <p
                style={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  margin: "5px 0",
                }}
              >
                {image.caption ? image.caption : "No caption available"}
              </p>
              <p style={{ fontSize: "12px", color: "#555" }}>
                <strong>Date:</strong> {image.date}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Container>
  ) : (
    <div className="spinner">
      <div className="align-item">
        <Spinner animation="grow" />
        <h5>
          <i>Loading...! Learn Facts about space Meanwhile!</i>
        </h5>
      </div>
    </div>
  );
};

export default EPIC;
