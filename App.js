import React from 'react';
import LandingPage from './LandingPage';
import About from './About';
import Contact from './Contact';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'


function App() {
  return (
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
  );
}

export default App;
