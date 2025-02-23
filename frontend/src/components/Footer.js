import React from "react";
import { Card } from "react-bootstrap";

function Footer() {
  return (
    <Card className="mx-1 mt-2 bg-dark text-light">
      <Card.Body>
        <blockquote className="blockquote mb-0 fs-6">
          <div>
            <i>
              <p className="m-2">
                Feel free to reach out at:
                <a
                  className="m-1"
                  href="https://www.linkedin.com/in/akanksha-kori-438689146/"
                  target="_blank"
                  rel="noopener noreferrer" // To prevent Security risk in old browser best practice for external links
                >
                  Linkedin
                </a>
              </p>
              <p className="m-2">
                Find More:
                <a
                  className="m-1"
                  href="https://github.com/Akankshakori02/Nasa-Exploration-Project"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              </p>
              <p className="m-2">
                Resource & Reference:
                <a
                  className="m-1"
                  href="https://api.nasa.gov/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  NASA Open API
                </a>
              </p>
            </i>
          </div>
          <footer className="blockquote-footer d-flex justify-content-end">
            <cite title="Source Title">Akanksha Kori</cite>
          </footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default Footer;
