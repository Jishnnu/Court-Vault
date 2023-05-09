/*
import React, { useState } from 'react';
import { Container, InputGroup, FormControl, Button, Row, Col, ListGroup, Spinner, Modal, Table } from 'react-bootstrap';
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000'
});

export default function Archieve() {
  const [searchText, setSearchText] = useState("");
  const [files, setFiles] = useState([]);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const handleButtonClick = () => {
    setIsButtonClicked(true);
    setFiles([]);
    setErrorMessage("");
  };

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
    setFiles([]);
    setIsButtonClicked(false);
  };

  const handleSearch = async () => {
    console.log('Searching for:', searchText);
    try {
      setIsLoading(true); // Set loading state to true
      setFiles([]);
      setErrorMessage("");
      const response = await axiosInstance.post('/search', { searchText: searchText });
      setFiles(response.data);
      setShowModal(true);
      setErrorMessage("");
    } catch (error) {
      console.log(error);
      setErrorMessage("Error occurred while searching.");
    } finally {
      setIsLoading(false); // Set loading state to false
    }
  };

  const indianStates = [
    'Andhra Pradesh',
    'Arunachal Pradesh',
    'Assam',
    'Bihar',
    'Chhattisgarh',
    'Goa',
    'Gujarat',
    'Haryana',
    'Himachal Pradesh',
    'Jharkhand',
    'Karnataka',
    'Kerala',
    'Madhya Pradesh',
    'Maharashtra',
    'Manipur',
    'Meghalaya',
    'Mizoram',
    'Nagaland',
    'Odisha',
    'Punjab',
    'Rajasthan',
    'Sikkim',
    'Tamil Nadu',
    'Telangana',
    'Tripura',
    'Uttar Pradesh',
    'Uttarakhand',
    'West Bengal',
    'Andaman and Nicobar Islands',
    'Chandigarh',
    'Dadra and Nagar Haveli and Daman and Diu',
    'Delhi',
    'Jammu and Kashmir',
    'Ladakh',
    'Lakshadweep',
    'Puducherry'
  ];

  return (
    <>
      <Row className="search">
        <Col>
          <br></br>
          <Container className="my-4">
            <InputGroup className="mb-3" onSubmit={handleSearch}>
              <FormControl
                aria-label="Search court evidence"
                value={searchText}
                required
                minLength={3}
                onChange={handleInputChange}
              />
              <Button variant="outline-secondary" id="button-addon2" onClick={handleSearch}>
                <i class="fa fa-search"></i>
              </Button>
            </InputGroup>            
          </Container>
          
          <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Search Result</Modal.Title>
            </Modal.Header>
            <Modal.Body>              
              {isLoading ? (
                <div className="text-center">
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </div>
              ) : files.length > 0 && searchText !== "" && isButtonClicked ? (
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>File Name</th>
                      <th>Metadata</th>
                      <th>Download</th>
                    </tr>
                  </thead>
                  <tbody>
                    {files.map((file) => (
                      <tr key={file.url}>
                        <td>{file.name}</td>
                        <td>{JSON.stringify(file.metadata)}</td>
                        <td>
                          <a href={file.url} target="_blank" rel="noreferrer">
                            Click to Download
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                files.length === 0 && isButtonClicked && searchText.length > 0 ? (
                  <h3>No Entries</h3>
                ) : errorMessage ? (
                  <h3>{errorMessage}</h3>
                ) : null
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </Col>
      </Row>
      <Row className="state-list">
        <Container className="my-4">
          <h2 style={{ color: "black" }}>Search by States & Union Territories</h2>
          <ListGroup>
            {indianStates.map((state) => (
              <ListGroup.Item key={state}>
                {state}
                <Button className="mx-2" variant="outline-secondary">
                  &rarr;
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Container>
      </Row>
    </>
  );
}
*/

import React, { useState } from 'react';
import { Container, InputGroup, FormControl, Button, Row, Col, ListGroup, Spinner, Modal, Table } from 'react-bootstrap';
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000'
});

export default function Archieve() {
  const [searchText, setSearchText] = useState("");
  const [files, setFiles] = useState([]);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isStateLoading, setIsStateLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const handleButtonClick = () => {
    setIsButtonClicked(true);
    setFiles([]);
    setErrorMessage("");
  };

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
    setFiles([]);
    setIsButtonClicked(false);
  };

  const handleSearch = async () => {
    console.log('Searching for:', searchText);
    try {
      setIsLoading(true);
      setFiles([]);
      setErrorMessage("");

      if (searchText !== "") {
        const response = await axiosInstance.post('/search', { searchText: searchText });
        setFiles(response.data);
        setShowModal(true);

        if (response.data.length > 0) {
          setSearchText("");
          setModalContent(
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>File Name</th>
                  <th>Metadata</th>
                  <th>Download</th>
                </tr>
              </thead>
              <tbody>
                {response.data.map((file) => (
                  <tr key={file.url}>
                    <td>{file.name}</td>
                    <td>{JSON.stringify(file.metadata)}</td>
                    <td>
                      <a href={file.url} target="_blank" rel="noreferrer">
                        Click to Download
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          );
        } else {
          setModalContent(<h6>Sorry, we don't have any court records related to <b><i>{searchText}</i></b></h6>);
        }
      } else {
        alert("Enter data in search bar");
      }
      setErrorMessage("");
    } catch (error) {
      console.log(error);
      setErrorMessage("Error occurred while searching.");
    } finally {
      setSearchText("");
      setIsLoading(false);
    }
  };

  const handleSearchByState = async (state) => {
    console.log('Searching for:', state);
    try {
      setIsStateLoading(true);
      setFiles([]);
      setErrorMessage("");

      if (state !== "") {
        const response = await axiosInstance.post('/search', { searchText: state });
        setFiles(response.data);
        setShowModal(true);

        if (response.data.length > 0) {
          setSearchText("");
          setModalContent(
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>File Name</th>
                  <th>Metadata</th>
                  <th>Download</th>
                </tr>
              </thead>
              <tbody>
                {response.data.map((file) => (
                  <tr key={file.url}>
                    <td>{file.name}</td>
                    <td>{JSON.stringify(file.metadata)}</td>
                    <td>
                      <a href={file.url} target="_blank" rel="noreferrer">
                        Click to Download
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          );
        } else {
          setModalContent(<h6>Sorry, we don't have any court records related to <b><i>{state}</i></b></h6>);
        }
      } else {
        alert("Enter data in search bar");
      }
      setErrorMessage("");
    } catch (error) {
      console.log(error);
      setErrorMessage("Error occurred while searching.");
    } finally {
      setIsStateLoading(false);
      setSearchText("");
    }
  };

  const indianStates = [
    'Andhra Pradesh',
    'Arunachal Pradesh',
    'Assam',
    'Bihar',
    'Chhattisgarh',
    'Goa',
    'Gujarat',
    'Haryana',
    'Himachal Pradesh',
    'Jharkhand',
    'Karnataka',
    'Kerala',
    'Madhya Pradesh',
    'Maharashtra',
    'Manipur',
    'Meghalaya',
    'Mizoram',
    'Nagaland',
    'Odisha',
    'Punjab',
    'Rajasthan',
    'Sikkim',
    'Tamil Nadu',
    'Telangana',
    'Tripura',
    'Uttar Pradesh',
    'Uttarakhand',
    'West Bengal',
    'Andaman and Nicobar Islands',
    'Chandigarh',
    'Dadra and Nagar Haveli and Daman and Diu',
    'Delhi',
    'Jammu and Kashmir',
    'Ladakh',
    'Lakshadweep',
    'Puducherry'
  ];

  return (
    <>
      <Row className="search">
        <Col>
          <br></br>
          <Container className="my-4">
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Search court evidence by case name, number, date, petitioner etc"
                aria-label="Search court evidence"
                value={searchText}
                required
                minLength={3}
                onChange={handleInputChange}
              />
              <Button variant="success" type="submit" id="button-addon2" disabled={isLoading} onClick={handleSearch}>
                {isLoading ? (
                  <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                  </Spinner>
                ) : (
                  <span>Search <i className="fa fa-search"></i></span>
                )}
              </Button>

            </InputGroup>
          </Container>

          <Modal show={showModal} size="xl" onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Search Result</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {isLoading ? (
                <div className="text-center">
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </div>
              ) : (
                modalContent ? modalContent : (
                  errorMessage ? <h3>{errorMessage}</h3> : null
                )
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="success" onClick={() => setShowModal(false)}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>

        </Col>
      </Row>
      <Row className="state-list">
        <Container className="my-4">
          <h2 style={{ color: "black" }}>Search by States & Union Territories</h2>
          <ListGroup>
            {indianStates.map((state) => (
              <ListGroup.Item key={state}>
                {state}

                <Button variant="outline-success" type="submit" disabled={isStateLoading} onClick={() => handleSearchByState(state)}>
                  {isStateLoading ? (
                    <Spinner className="spinner-grow text-success" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  ) : (
                    <span>&rarr;</span>
                  )}
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Container>
      </Row>
    </>
  );
}