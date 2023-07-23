import logo from './logo.svg';
import './App.css';
import React from 'react';
import AppHeader from "./components/header";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
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
          <Route exact path="/Court-Vault/" element={<WelcomePage />} />
          <Route exact path="/Court-Vault/archieve" element={<Archieve />} />
          <Route exact path="/Court-Vault/login" element={<LoginPage />} />
          <Route exact path="/Court-Vault/logout" element={<Logout />} />
          <Route exact path="/Court-Vault/thankyou" element={<ThankYouPage />} />
          <Route exact path="/Court-Vault/upload" element={<UploadPage />} />
          <Route exact path="/Court-Vault/aboutus" element={<AboutUs />} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;
