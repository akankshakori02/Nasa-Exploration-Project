import React, { useState, useEffect } from "react";
import {
  DropdownButton,
  Dropdown,
  Container,
  Image,
  Row,
  Col,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const EPIC = () => {
  const [epicData, setImages] = useState([]);
  const [type, setType] = useState("natural"); 

  useEffect(() => {
    fetch(`http://localhost:5000/api/epic?type=${type}`)
      .then((response) => response.json())
      .then((data) => setImages(data))
      .catch((error) => console.error("Error fetching images:", error));
  }, [type]);

  return (
    <Container>
      <Row>
        <Col md="auto"><h2>Earth Polychromatic Imaging Camera (EPIC)</h2></Col>
        <Col>
      <DropdownButton className="mx-5 my-2" variant="dark" id="dropdown-basic-button" title={`Images: ${type.toUpperCase()}`}>
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
            <Image
              style={{ width: "100%", display: "block" }}
              src={`https://epic.gsfc.nasa.gov/archive/${type}/${image.date
                .substring(0, 10)
                .replace(/-/g, "/")}/jpg/${image.image}.jpg`}
              alt={`EPIC Image ${image.identifier}`}
              fluid
            />
          </div>
        ))}
      </div>
    </Container>
  );
};

export default EPIC;
