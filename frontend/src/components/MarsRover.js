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
import { CAMERA_NAMES } from "../data/camera.types";

const MarsRover = () => {
  const [photos, setPhotos] = useState(null); // State to hold all photos
  const [filteredPhotos, setFilteredPhotos] = useState([]); // State to hold filtered photos based on selected camera
  const [camera, setCamera] = useState("all"); // State to control selected camera
  const [cameras, setCameras] = useState([]); // State to store all unique camera names

  // Fetch Mars Rover Photos
  const fetchMarsPhotos = async () => {
    try {
      const response = await axios.get("http://localhost:5000/mars");
      setPhotos(response.data.photos);
      setFilteredPhotos(response.data.photos);

      // Extract unique camera names from API response
      const uniqueCameras = [
        ...new Set(response.data.photos.map((photo) => photo.camera.name)),
      ];
      setCameras(uniqueCameras);
    } catch (error) {
      console.error("Error fetching Mars photos:", error);
    }
  };

  useEffect(() => {
    fetchMarsPhotos();
    // Update filtered photos when camera selection changes
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
        {cameras.map((cameraName, index) => (
          <ToggleButton
            key={index}
            variant="dark"
            id={`tbg-btn-${index + 2}`}
            value={cameraName}
          >
            {CAMERA_NAMES[cameraName] || cameraName}
          </ToggleButton>
        ))}
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
