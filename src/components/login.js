import React, { useState } from 'react';
import { Container, Form, Button, Spinner } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

function LoginPage() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Check if code and password fields are valid
    if (password === "" || email === "") {
      alert('Mandatory Fields empty');
    } else {
      setIsLoading(true);
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log(userCredential)
          window.location.href = "/upload";
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
          alert("Incorrect username or password. Please try again.");
        });
    }
  };

  return (
    <Container className="login-container d-flex flex-column justify-content-center align-items-center vw-100">
      <h2 style={{ marginTop: "100px" }}>Court Login</h2>
      <Form onSubmit={handleSubmit} className="login-form">
        <Form.Group controlId="passkey">
          <Form.Label>Enter Email <span style={{ color: "red" }}>*</span> </Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Your Court Email"
            value={email}
            minLength={1}
            required
            className="login-input"
            onChange={(event) => setEmail(event.target.value)}
            onFocus={(e) => e.target.classList.add('focused')}
            onBlur={(e) => e.target.classList.remove('focused')}            
          />
        </Form.Group>
        <br></br>
        <Form.Group controlId="passkey">
          <Form.Label>Enter Password <span style={{ color: "red" }}>*</span> </Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Your Password"
            value={password}
            required
            className="login-input"
            onChange={(event) => setPassword(event.target.value)}
            onFocus={(e) => e.target.classList.add('focused')}
            onBlur={(e) => e.target.classList.remove('focused')}            
          />
        </Form.Group>
        <br></br>
        <Button variant="success" type="submit" disabled={isLoading}>
          {isLoading ? (
            <Spinner animation="border" role="status"> {/* Show the spinner during loading state */}
              <span className="sr-only">Loading...</span>
            </Spinner>
          ) : (
            'Login' // Show the normal text on the submit button
          )}
        </Button>
        <br></br>
      </Form>
    </Container>
  );
}

export default LoginPage;
