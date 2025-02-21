import React, { useState, useEffect } from "react";
import { Toast } from "react-bootstrap";
import { spaceFacts } from "../data/SpaceFacts";

const Facts = ({ onClose }) => {
  const [randomFact, setRandomFact] = useState(""); // State to store a randomly selected fact

  // Select new fact in every 10 seconds
  useEffect(() => {
    setRandomFact(spaceFacts[Math.floor(Math.random() * spaceFacts.length)]);
    const interval = setInterval(() => {
      setRandomFact(spaceFacts[Math.floor(Math.random() * spaceFacts.length)]);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Toast className="bg-dark text-white mt-5" onClose={onClose}>
      <Toast.Header>
        <strong className="me-auto">Do you know?</strong>
      </Toast.Header>
      <Toast.Body>{randomFact}</Toast.Body>
      <blockquote className="blockquote mb-0">
        <footer className="blockquote-footer ps-md-5">
          <cite title="Source Title">National Geographic</cite>
        </footer>
      </blockquote>
    </Toast>
  );
};

export default Facts;
