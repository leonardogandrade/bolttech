import React from 'react';
import { Routes, Route, BrowserRouter, Navigate, Router } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import PrivateRoutes from './utils/PrivateRoutes';



export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>
        <Route path='/' element={<Login />} />
        <Route path='/signUp' element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  )
}

// {/* <BrowserRouter>
// <Routes>
//   <Route element={<PrivateRoutes />}>
//     <Route path='/dashboard' element={<Dashboard />} />
//   </Route>
//   <Route path='/' element={<Login />} />
//   <Route path='/signUp' element={<SignUp />} />
// </Routes>
// </BrowserRouter> */}