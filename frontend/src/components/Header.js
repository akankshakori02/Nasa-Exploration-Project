import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Tooltip, OverlayTrigger, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const Header = ({ toggleFacts, showFacts, userName }) => {
  return (
    <Navbar className="m-1" bg="dark" data-bs-theme="dark">
      <Container className="bg-body-tertiary">
        <Navbar.Brand as={NavLink} to="/apod">
          NASA Exploratory
        </Navbar.Brand>
        <Nav>
          {/* Added tooltips to provide additional context */}
          <OverlayTrigger
            placement="bottom"
            overlay={
              <Tooltip id="tooltip-apod">
                Click to view Astronomy Picture of the Day!
              </Tooltip>
            }
          >
            <Nav.Link as={NavLink} to="/apod" activeClassName="active">
              APOD
            </Nav.Link>
          </OverlayTrigger>
          <OverlayTrigger
            placement="bottom"
            overlay={
              <Tooltip id="tooltip-mars-rover">
                Click to view photos taken by Mars Rovers!
              </Tooltip>
            }
          >
            <Nav.Link as={NavLink} to="/mars-rover" activeClassName="active">
              Mars Rover Photos
            </Nav.Link>
          </OverlayTrigger>
          <OverlayTrigger
            placement="bottom"
            overlay={
              <Tooltip id="tooltip-epic">
                Click to view photos taken by Earth Polychromatic Imaging
                Camera!
              </Tooltip>
            }
          >
            <Nav.Link as={NavLink} to="/epic" activeClassName="active">
              EPIC
            </Nav.Link>
          </OverlayTrigger>
        </Nav>
        {/* Button to toggle the visibility of facts */}
        <Button
          onClick={toggleFacts}
          className="p-md-1 ms-2 fact-btn"
          variant={showFacts ? "dark" : "secondary"}
        >
          {showFacts ? "Hide Facts" : "Show Facts"}
        </Button>
      </Container>
      {/* Display current username (default to "Anonymous") */}
      <Navbar.Text className="mx-2">
        Signed in as: {userName || "Anonymous"}
      </Navbar.Text>
    </Navbar>
  );
};

export default Header;
