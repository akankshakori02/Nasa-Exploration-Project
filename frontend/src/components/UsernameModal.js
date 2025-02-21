import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { validateUserInput } from "../data/customValidator";

const UsernameModal = ({ showModal, setShowModal, setUserName }) => {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");

  const isFormValid = validateUserInput(inputValue) && inputValue.length > 2;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      localStorage.setItem("userName", inputValue);
      setUserName(inputValue);
      setShowModal(false);
      setError("");
    } else {
      setError("Please enter a valid alphanumeric name or email address.");
    }
  };

  return (
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
                setError("");
              }}
              isInvalid={!!error}
            />
            <Form.Control.Feedback type="invalid">
              {error}
            </Form.Control.Feedback>
          </Form.Group>
          <Button
            variant="secondary"
            type="submit"
            className="mt-3"
            disabled={!isFormValid}
          >
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default UsernameModal;
