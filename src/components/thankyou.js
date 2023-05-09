import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaCheckCircle } from 'react-icons/fa';

function ThankYouPage() {
    return (
        <Container className="py-5 text-center"> 
            <FaCheckCircle size={72} className="text-success mb-3" />
            <h1 className="mb-3">Thank You!</h1>
            <p className="lead mb-5">
                Your case document has been uploaded. Visit the Search page to view the details.
            </p>
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <img
                        src="https://bit.ly/43KB58P"
                        alt="Thank You"
                        className="img-fluid rounded"
                        style={{ height: "300px" }}
                    />
                </Col>
            </Row>
        </Container>
    );
}

export default ThankYouPage;
