import React, { useState } from 'react';
import { Container, Form, Button, Spinner } from "react-bootstrap";
import axios from 'axios';
import "./upload.css"
import { Buffer } from 'buffer';
global.Buffer = Buffer;

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000'
});


function UploadPage() {
  const [title, setTitle] = useState('');
  const [caseNum, setCaseNum] = useState("");
  const [station, setStation] = useState("");
  const [FIR, setFIR] = useState("");
  const [act, setAct] = useState("");
  const [section, setSection] = useState("");
  const [caseType, setCaseType] = useState("");
  const [petitioner, setPetitioner] = useState("");
  const [respondent, setRespondent] = useState("");
  const [advocate, setAdvocate] = useState("");
  const [court, setCourt] = useState("");
  const [state, setState] = useState("");
  const [dateFiled, setDateFiled] = useState("");
  const [dateListed, setDateListed] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [file, setFile] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('file', file);
    formData.append('caseNum', caseNum);
    formData.append('station', station);
    formData.append('FIR', FIR);
    formData.append('act', act);
    formData.append('section', section);
    formData.append('caseType', caseType);
    formData.append('petitioner', petitioner);
    formData.append('respondent', respondent);
    formData.append('advocate', advocate);
    formData.append('court', court);
    formData.append('state', state);
    formData.append('dateFiled', dateFiled);
    formData.append('dateListed', dateListed);
    formData.append('selectedValue', selectedValue);

    try {
      alert("Please wait. This might take some time.");
      setIsLoading(true);
      const response = await axiosInstance.post('/upload', formData);
      console.log(response.data.url);
      setFileUrl(response.data.url);
      alert('Data uploaded successfully');
      window.location.href = "/thankyou";
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container className="upload-container d-flex flex-column justify-content-center align-items-center vw-100">
      <br></br>
      <h2>Court Case Document Submission</h2>
      <Form onSubmit={handleSubmit} className="login-form">
        <Form.Group controlId="formTitle">
          <Form.Label>Case Title <span style={{ color: "red" }}>*</span> </Form.Label>
          <Form.Control className='upload-form-control'
            type="text"
            placeholder="Enter the Case Name"
            required
            minLength={1}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onFocus={(e) => e.target.classList.add('focused')}
            onBlur={(e) => e.target.classList.remove('focused')} />
        </Form.Group>
        <br></br>

        <Form.Group controlId="formTitle">
          <Form.Label>Case Number <span style={{ color: "red" }}>*</span> </Form.Label>
          <Form.Control className='upload-form-control'
            type="text"
            placeholder="Enter the Case Number"
            required
            value={caseNum}
            minLength={1}
            onChange={(e) => setCaseNum(e.target.value)}
            onFocus={(e) => e.target.classList.add('focused')}
            onBlur={(e) => e.target.classList.remove('focused')} />
        </Form.Group>
        <br></br>

        <Form.Group controlId="formTitle">
          <Form.Label>Police Station <span style={{ color: "red" }}>*</span> </Form.Label>
          <Form.Control className='upload-form-control'
            type="text"
            placeholder="Enter the name of the Police Station"
            required
            value={station}
            minLength={1}
            onChange={(e) => setStation(e.target.value)}
            onFocus={(e) => e.target.classList.add('focused')}
            onBlur={(e) => e.target.classList.remove('focused')} />
        </Form.Group>
        <br></br>

        <Form.Group controlId="formTitle">
          <Form.Label>FIR Number <span style={{ color: "red" }}>*</span> </Form.Label>
          <Form.Control className='upload-form-control'
            type="text"
            placeholder="Enter the FIR number"
            required
            value={FIR}
            minLength={1}
            onChange={(e) => setFIR(e.target.value)}
            onFocus={(e) => e.target.classList.add('focused')}
            onBlur={(e) => e.target.classList.remove('focused')} />
        </Form.Group>
        <br></br>

        <Form.Group controlId="formTitle">
          <Form.Label>Act Type <span style={{ color: "red" }}>*</span> </Form.Label>
          <Form.Control className='upload-form-control'
            type="text"
            placeholder="Enter the Act under which proceedings where held"
            required
            value={act}
            minLength={1}
            onChange={(e) => setAct(e.target.value)}
            onFocus={(e) => e.target.classList.add('focused')}
            onBlur={(e) => e.target.classList.remove('focused')} />
        </Form.Group>
        <br></br>

        <Form.Group controlId="formTitle">
          <Form.Label>Section Number <span style={{ color: "red" }}>*</span> </Form.Label>
          <Form.Control className='upload-form-control'
            type="text"
            placeholder="Enter the Section enacted"
            required
            value={section}
            minLength={1}
            onChange={(e) => setSection(e.target.value)}
            onFocus={(e) => e.target.classList.add('focused')}
            onBlur={(e) => e.target.classList.remove('focused')} />
        </Form.Group>
        <br></br>

        <Form.Group controlId="formTitle">
          <Form.Label>Case Type <span style={{ color: "red" }}>*</span> </Form.Label>
          <Form.Control className='upload-form-control'
            type="text"
            placeholder="Enter the Type of the case"
            required
            value={caseType}
            minLength={1}
            onChange={(e) => setCaseType(e.target.value)}
            onFocus={(e) => e.target.classList.add('focused')}
            onBlur={(e) => e.target.classList.remove('focused')} />
        </Form.Group>
        <br></br>

        <Form.Group controlId="formTitle">
          <Form.Label>Petitioner <span style={{ color: "red" }}>*</span> </Form.Label>
          <Form.Control className='upload-form-control'
            type="text"
            placeholder="Enter the name of the Petitioner"
            required
            value={petitioner}
            minLength={1}
            onChange={(e) => setPetitioner(e.target.value)}
            onFocus={(e) => e.target.classList.add('focused')}
            onBlur={(e) => e.target.classList.remove('focused')} />
        </Form.Group>
        <br></br>

        <Form.Group controlId="formTitle">
          <Form.Label>Respondent <span style={{ color: "red" }}>*</span> </Form.Label>
          <Form.Control className='upload-form-control'
            type="text"
            placeholder="Enter the name of the Respondent"
            required
            value={respondent}
            minLength={1}
            onChange={(e) => setRespondent(e.target.value)}
            onFocus={(e) => e.target.classList.add('focused')}
            onBlur={(e) => e.target.classList.remove('focused')} />
        </Form.Group>
        <br></br>

        <Form.Group controlId="formTitle">
          <Form.Label>Advocate <span style={{ color: "red" }}>*</span> </Form.Label>
          <Form.Control className='upload-form-control'
            type="text"
            placeholder="Enter the name of the Advocate"
            required
            value={advocate}
            minLength={1}
            onChange={(e) => setAdvocate(e.target.value)}
            onFocus={(e) => e.target.classList.add('focused')}
            onBlur={(e) => e.target.classList.remove('focused')} />
        </Form.Group>
        <br></br>

        <Form.Group controlId="formTitle">
          <Form.Label>Court <span style={{ color: "red" }}>*</span> </Form.Label>
          <Form.Control className='upload-form-control'
            type="text"
            placeholder="Enter the name of the Court"
            required
            value={court}
            minLength={1}
            onChange={(e) => setCourt(e.target.value)}
            onFocus={(e) => e.target.classList.add('focused')}
            onBlur={(e) => e.target.classList.remove('focused')} />
        </Form.Group>
        <br></br>

        <Form.Group controlId="formTitle">
          <Form.Label>State <span style={{ color: "red" }}>*</span> </Form.Label>
          <Form.Control className='upload-form-control'
            type="text"
            placeholder="Enter the name of the State"
            required
            value={state}
            minLength={1}
            onChange={(e) => setState(e.target.value)}
            onFocus={(e) => e.target.classList.add('focused')}
            onBlur={(e) => e.target.classList.remove('focused')} />
        </Form.Group>
        <br></br>

        <Form.Group controlId="formTitle">
          <Form.Label>Date Filed <span style={{ color: "red" }}>*</span> </Form.Label>
          <Form.Control className='upload-form-control'
            type="text"
            placeholder="Enter the Date on which the case was filed (Eg: 01-06-2023)"
            required
            value={dateFiled}
            minLength={10}
            onChange={(e) => setDateFiled(e.target.value)}
            onFocus={(e) => e.target.classList.add('focused')}
            onBlur={(e) => e.target.classList.remove('focused')} />
        </Form.Group>
        <br></br>

        <Form.Group controlId="formTitle">
          <Form.Label>Date Listed <span style={{ color: "red" }}>*</span> </Form.Label>
          <Form.Control className='upload-form-control'
            type="text"
            placeholder="Enter the today's Date (Eg: 01-06-2023)"
            required
            value={dateListed}
            minLength={10}
            onChange={(e) => setDateListed(e.target.value)}
            onFocus={(e) => e.target.classList.add('focused')}
            onBlur={(e) => e.target.classList.remove('focused')} />
        </Form.Group>
        <br></br>

        <Form.Group>
          <Form.Label>Case Status <span style={{ color: "red" }}>*</span> </Form.Label>
          <div>
            <Form.Check
              // Pending: A case that has been filed with the court but has not yet been resolved.
              type='radio'
              inline
              label='Pending'
              name='radio-group'
              value='Pending'
              checked={selectedValue === 'Pending'}
              onChange={handleRadioChange}
            />
            <Form.Check
              // Active: A case that is currently being litigated or is still in progress.
              type='radio'
              inline
              label='Active'
              name='radio-group'
              value='Active'
              checked={selectedValue === 'Active'}
              onChange={handleRadioChange}
            />
            <Form.Check
              // Dismissed: A case that has been terminated by the court before trial or hearing, either at the request of the parties or by the court.
              type='radio'
              inline
              label='Dismissed'
              name='radio-group'
              value='Dismissed'
              checked={selectedValue === 'Dismissed'}
              onChange={handleRadioChange}
            />
            <Form.Check
              // Settled: A case that has been resolved through an agreement between the parties, often through a settlement or mediation.
              type='radio'
              inline
              label='Settled'
              name='radio-group'
              value='Settled'
              checked={selectedValue === 'Settled'}
              onChange={handleRadioChange}
            />
            <Form.Check
              // Judgment: A case that has been resolved by a judge or jury after a trial or hearing, resulting in a final decision or verdict.
              type='radio'
              inline
              label='Judgement'
              name='radio-group'
              value='Judgement'
              checked={selectedValue === 'Judgement'}
              onChange={handleRadioChange}
            />
            <Form.Check
              // Appeal: A case that has been appealed to a higher court for review of the lower court's decision.
              type='radio'
              inline
              label='Appeal'
              name='radio-group'
              value='Appeal'
              checked={selectedValue === 'Appeal'}
              onChange={handleRadioChange}
            />
            <Form.Check
              // Closed: A case that has been fully resolved and is no longer pending or active.
              type='radio'
              inline
              label='Closed'
              name='radio-group'
              value='Closed'
              checked={selectedValue === 'Closed'}
              onChange={handleRadioChange}
            />
          </div>
        </Form.Group>
        <br></br> <br></br>

        <Form.Group controlId="formFile">
          <Form.Label>Approved Case Document File <span style={{ color: "red" }}>*</span> </Form.Label>
          <Form.Control type="file"
            required
            accept=".jpg,.jpeg,.png,.pdf,.doc,.docx,.mp4,.avi,.mov,.mkv,.mp3,.wav,.aac,.xls,.xlsx,.ppt,.pptx"
            onChange={(e) => setFile(e.target.files[0])}
            onFocus={(e) => e.target.classList.add('focused')}
            onBlur={(e) => e.target.classList.remove('focused')} />
        </Form.Group>
        <br></br>

        <Button variant="success" type="submit" disabled={isLoading}>
          {isLoading ? (
            <Spinner animation="border" role="status"> {/* Show the spinner during loading state */}
              <span className="sr-only">Loading...</span>
            </Spinner>
          ) : (
            'Upload' // Show the normal text on the submit button
          )}
        </Button>
        <br></br>

      </Form>
      {fileUrl && <img src={fileUrl} alt="Uploaded file" />}
    </Container>
  );
}

export default UploadPage;
