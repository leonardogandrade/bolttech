import React from 'react';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import { isAuthenticated } from './service/authenticate';

function PrivateOutlet({ children }) {
  const auth = isAuthenticated();
  return auth ? children : <Navigate to="/" />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signUp' element={<SignUp />} />
        <Route
          path="/dashboard"
          element={
            <PrivateOutlet>
              <Dashboard />
            </PrivateOutlet>
          } />
      </Routes>
    </BrowserRouter>
  )
}
