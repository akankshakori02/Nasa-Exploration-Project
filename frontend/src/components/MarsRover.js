import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  ToggleButtonGroup,
  ToggleButton,
  Container,
  Spinner,
} from "react-bootstrap";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import "../index.css";

const MarsRover = () => {
  const [photos, setPhotos] = useState(null);
  const [filteredPhotos, setFilteredPhotos] = useState([]);
  const [camera, setCamera] = useState("all");

  useEffect(() => {
    const fetchMarsPhotos = async () => {
      try {
        const response = await axios.get("http://localhost:5000/mars");
        setPhotos(response.data.photos);
        setFilteredPhotos(response.data.photos);
      } catch (error) {
        console.error("Error fetching Mars photos:", error);
      }
    };
    fetchMarsPhotos();
  }, []);

  useEffect(() => {
    if (camera === "all") {
      setFilteredPhotos(photos);
    } else {
      const filtered = photos.filter((photo) => photo.camera.name === camera);
      setFilteredPhotos(filtered);
    }
  }, [camera, photos]);

  const handleCameraChange = (selectedCamera) => setCamera(selectedCamera);

  return filteredPhotos ? (
    <Container>
      <h2>Mars Rover Photos</h2>
      <ToggleButtonGroup
        variant="secondary"
        className="m-2"
        type="radio"
        name="camera"
        value={camera}
        onChange={handleCameraChange}
      >
        <ToggleButton variant="dark" id="tbg-btn-1" value="all">
          All
        </ToggleButton>
        <ToggleButton variant="dark" id="tbg-btn-2" value="FHAZ">
          Front Hazard Avoidance Camera
        </ToggleButton>
        <ToggleButton variant="dark" id="tbg-btn-3" value="RHAZ">
          Rear Hazard Avoidance Camera
        </ToggleButton>
        <ToggleButton variant="dark" id="tbg-btn-4" value="MAST">
          Mast Camera
        </ToggleButton>
        <ToggleButton variant="dark" id="tbg-btn-5" value="CHEMCAM">
          Chemistry and Camera Complex
        </ToggleButton>
        <ToggleButton variant="dark" id="tbg-btn-6" value="MAHLI">
          Mars Hand Lens Imager
        </ToggleButton>
        <ToggleButton variant="dark" id="tbg-btn-7" value="MARDI">
          Mars Descent Imager
        </ToggleButton>
        <ToggleButton variant="dark" id="tbg-btn-8" value="NAVCAM">
          Navigation Camera
        </ToggleButton>
      </ToggleButtonGroup>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {filteredPhotos.map((photo) => (
          <LazyLoadImage
            key={photo.id}
            src={photo.img_src}
            alt={`Mars Rover Photo ${photo.id}`}
            style={{ width: "200px", height: "200px", margin: "10px" }}
            effect="blur"
          />
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

export default MarsRover;
