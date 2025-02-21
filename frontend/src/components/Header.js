import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Tooltip, OverlayTrigger, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Header = ({ toggleFacts, showFacts, userName }) => {
  return (
    <Navbar className="m-1" bg="dark" data-bs-theme="dark">
      <Container className="bg-body-tertiary">
        <Navbar.Brand as={Link} to="/apod">
          NASA Exploratory
        </Navbar.Brand>
        <Nav>
          <OverlayTrigger
            placement="bottom"
            overlay={
              <Tooltip id="tooltip-apod">
                Click to view Astronomy Picture of the Day!
              </Tooltip>
            }
          >
            <Nav.Link as={Link} to="/apod">
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
            <Nav.Link as={Link} to="/mars-rover">
              Mars Rover Photos{" "}
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
            <Nav.Link as={Link} to="/epic">
              EPIC
            </Nav.Link>
          </OverlayTrigger>
        </Nav>

        <Button
          onClick={toggleFacts}
          className="p-md-1 ms-2"
          variant={showFacts ? "dark" : "secondary"}
          style={{
            borderRadius: "5px",
            cursor: "pointer",
            zIndex: 1001,
          }}
        >
          {showFacts ? "Hide Facts" : "Show Facts"}
        </Button>
      </Container>
      <Navbar.Text className="mx-2">
        Signed in as: {userName || "Anonymous"}
      </Navbar.Text>
    </Navbar>
  );
};

export default Header;
