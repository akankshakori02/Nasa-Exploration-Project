import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import APOD from "./components/APOD";
import Facts from "./components/Facts";
import EPIC from "./components/EPIC";
import MarsRover from "./components/MarsRover";
import { Modal, Button, Form } from 'react-bootstrap';
import Footer from "./components/Footer";

const App = () => {
  const [showFacts, setShowFacts] = useState(true);
  const [showModal, setShowModal] = useState(false); // State to manage modal visibility
  const [userName, setUserName] = useState(''); // State to store username
  const [inputValue, setInputValue] = useState(''); // State to store the input value
  const [error, setError] = useState(''); 

  //To toggle Facts visibility
  const toggleFacts = () => {
    setShowFacts((prev) => !prev);
  };

  // Check localStorage for username on initial load
  useEffect(() => {
    const storedUserName = sessionStorage.getItem('userName');
    if (!storedUserName) {
      setShowModal(true); // Show modal if no username is stored
    } else {
      setUserName(storedUserName); // Set username from localStorage
    }
  }, []);


  const validateInput = (value) => {
    const alphanumericRegex = /^[a-zA-Z0-9]+$/; // Alphanumeric regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Email regex

    if (alphanumericRegex.test(value)) {
      return true; // Valid alphanumeric
    } else if (emailRegex.test(value)) {
      return true; // Valid email
    } else {
      return false; // Invalid input
    }
  };
  // Handle username submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateInput(inputValue)) {
      localStorage.setItem('userName', inputValue); // Store username in localStorage
      setUserName(inputValue); // Update the username state
      setShowModal(false); // Close the modal
      setError(''); // Clear any previous error
    } else {
      setError('Please enter a valid alphanumeric name or email address.'); // Show error message
    }
  };

  return (
    <>
    <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Welcome to NASA Exploratory!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="username">
              <Form.Label>Please enter your name or email:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Your name or email"
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                  setError(''); // Clear error when user types
                }}
                isInvalid={!!error} // Show red border if there's an error
              />
              <Form.Control.Feedback type="invalid">
                {error}
              </Form.Control.Feedback>
            </Form.Group>
            <Button variant="secondary" type="submit" className="mt-3">
              Submit
            </Button>
          </Form>
          </Modal.Body>
        </Modal>
    <BrowserRouter>
        <Header toggleFacts={toggleFacts} showFacts={showFacts} userName={userName} />
        <div style={{minHeight:'80vh'}}><Routes>
          <Route path="/apod" element={<APOD />} />
          <Route path="/mars-rover" element={<MarsRover />} />
          <Route path="/epic" element={<EPIC />} />
        </Routes>
        </div>
        <div style={{ position: "absolute", top: "1rem", right: "0rem", opacity:'92%', zIndex: 1000 }}>
          {showFacts && <Facts onClose={toggleFacts} />}
        </div>
        <Footer />
    </BrowserRouter>
    </>
  );
};

export default App;
