import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToggleButtonGroup, ToggleButton, Container } from "react-bootstrap";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import "../index.css";
import { CAMERA_NAMES } from "../data/camera.types";
import LoadSpinner from "./LoadSpinner";

const MarsRover = () => {
  const [photos, setPhotos] = useState(null); // State to hold all photos
  const [filteredPhotos, setFilteredPhotos] = useState([]); // State to hold filtered photos based on selected camera
  const [camera, setCamera] = useState("all"); // State to control selected camera
  const [cameras, setCameras] = useState([]); // State to store all unique camera names
  const [error, setError] = useState(null); //State to handle error

  // Fetch Mars Rover Photos
  const fetchMarsPhotos = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/mars`);
      setPhotos(response.data.photos);
      setFilteredPhotos(response.data.photos);
      setError(null);

      // Extract unique camera names from API response
      const uniqueCameras = [
        ...new Set(response.data.photos.map((photo) => photo.camera.name)),
      ];
      setCameras(uniqueCameras);
    } catch (error) {
      console.error("Error fetching Mars photos:", error);
      setError("Failed to fetch Mars Rover data. Please try again later.");
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

  return error ? (
    <p className="set-error center">{error}</p>
  ) : filteredPhotos ? (
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
      <div className="d-flex flex-wrap">
        {filteredPhotos.map((photo) => (
          <LazyLoadImage
            key={photo.id}
            src={photo.img_src}
            className="custom-size m-2"
            alt={`Mars Rover Photo ${photo.id}`}
            effect="blur"
          />
        ))}
      </div>
    </Container>
  ) : (
    <LoadSpinner />
  );
};

export default MarsRover;
