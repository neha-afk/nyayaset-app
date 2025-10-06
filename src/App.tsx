import React from 'react';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NyayaSetuApp from './NyayaSetuApp';
import NyayaSetuDashboard from './dashboard'; // Correct component name
import LawyerDashboard from './lawyerdashboard';
import JurisConnect from './jurisconnect'; // Import JurisConnect

function App() {
  return (
    <Router>
      <Routes>
        {/* Login page */}
        <Route path="/" element={<NyayaSetuApp />} />
        <Route path="/login" element={<NyayaSetuApp />} />
        
        {/* Dashboard after login */}
        <Route path="/dashboard" element={<NyayaSetuDashboard />} />

        <Route path="/lawyerdashboard" element={<LawyerDashboard />} />
         {/* JurisConnect - Legal Social Platform */}
        <Route path="/jurisconnect" element={<JurisConnect />} />
        
      </Routes>
    </Router>
  );
}

export default App;