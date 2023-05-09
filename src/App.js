import logo from './logo.svg';
import './App.css';
import React from 'react';
import AppHeader from "./components/header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WelcomePage from "./components/welcome";
import { Row, Col } from "react-bootstrap";
import Archieve from './components/archieve';
import LoginPage from './components/login';
import UploadPage from './components/upload';
import AboutUs from './components/aboutUs';
import Logout from './components/logout';
import ThankYouPage from './components/thankyou';

function App() {
  return (
    <Router>
      <div className="App">
        <header className='header'>
          <AppHeader />
        </header>

        <Routes>
          <Route exact path="/" element={<WelcomePage />} />
          <Route exact path="/archieve" element={<Archieve />} />
          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/logout" element={<Logout />} />
          <Route exact path="/thankyou" element={<ThankYouPage />} />
          <Route exact path="/upload" element={<UploadPage />} />
          <Route exact path="/aboutus" element={<AboutUs />} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;
