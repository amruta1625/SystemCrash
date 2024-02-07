// App.js
import React from 'react';
import Register from './components/register/register'; // Adjust the path based on your project structure
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from './components/login/login';
import Home from './components/homepage/homepage';
import ForgotPassword from './components/forgotpassword/forgotpassword';



const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>} />
        <Route path="/home" element={<Home />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />

        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;