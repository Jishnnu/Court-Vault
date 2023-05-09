import React from "react";
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import TypeWriter from 'typewriter-effect'
import '../App.css'

function WelcomePage() {
  return (
    <div className="welcomeBackground">
      <Container>
        <br></br><br></br><br></br><br></br>
        <br></br><br></br><br></br><br></br>
        <h1 style={{ color: "#ffffff" }}>
          <TypeWriter
            options={{
              autoStart: true,
              loop: true,
              delay: 45,
              strings: ["Welcome to Evidence Archives", "Public Court Documents"]
            }}
          />
        </h1>
        <br></br>
        <p>
          The court is where the voiceless can speak, the weak can be made strong, and the powerful can be held accountable.
        </p>
        <Link to="/archieve">
          <Button className="getStartedBtn" variant="success" size="lg">
            Get Started
          </Button>
        </Link>
      </Container>
    </div>
  );
}

export default WelcomePage;
