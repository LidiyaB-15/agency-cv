// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import RegisterForm from './pages/RegisterForm';
import CVPage from './pages/CVPage';

const App = () => {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
           <Route path="/" element={<RegisterForm />} />
           <Route path="/cv" element={<CVPage />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
};

export default App;