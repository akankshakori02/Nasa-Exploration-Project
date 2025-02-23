import React from "react";
import { Spinner } from "react-bootstrap";
import "../index.css";

const LoadSpinner = () => {
  return (
    <div className="center">
      <div className="align-item">
        <Spinner animation="grow" />
        <h5>
          <i>Loading...! Learn Facts about space meanwhile!</i>
        </h5>
      </div>
    </div>
  );
};

export default LoadSpinner;
