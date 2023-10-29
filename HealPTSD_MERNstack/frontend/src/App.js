import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Verify from './pages/Verify';
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard';
import Journal from './pages/Journal';
import SelfAssessment from './pages/SelfAssessment';
import Question1 from './pages/Question1';
import Question2 from './pages/Question2';
import Question3 from './pages/Question3';

const App = () => {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/register" element={<Registration />} />
          <Route exact path="/verify" element={<Verify />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/admin/login" element={<AdminLogin />} />
          <Route exact path="/admin/dashboard" element={<AdminDashboard />} />
          <Route exact path="/journal" element={<Journal />} />
          <Route exact path="/self-assessment" element={<SelfAssessment />} />
          <Route exact path="/self-assessment/question-1" element={<Question1 />} />
          <Route exact path="/self-assessment/question-2" element={<Question2 />} />
          <Route exact path="/self-assessment/question-3" element={<Question3 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
