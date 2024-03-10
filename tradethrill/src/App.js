// App.js
import React from 'react';
import Register from './components/register/register'; // Adjust the path based on your project structure
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from './components/login/login';
import Home from './components/homepage/homepage';
import ForgotPassword from './components/forgotpassword/forgotpassword';
import SellPage from './components/sellpage/sellpage';
import ProfilePage from './components/profile/profilepage/profilepage';
import Transactions from './components/profile/transactions/transactions';
import Notifications from './components/notifications/notifications';



const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>} />
        <Route path="/home" element={<Home />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/sellpage" element={<SellPage />} />

        <Route path='/profilepage' element= {<ProfilePage/>}/>
        <Route path='/transactions' element= {<Transactions />}/> 

        <Route path='/notify' element= {<Notifications />}/> 

        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;