// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Encrypt_Decrypt from './components/Encrypt_Decrypt';

function App() {
  return (
    <Router>
      
          <Routes>
            <Route exact path="/" element={<Encrypt_Decrypt />} />
            <Route exact path="/Image" element={<Encrypt_Decrypt />} />
          </Routes>
    
    </Router>
  );
}

export default App;
