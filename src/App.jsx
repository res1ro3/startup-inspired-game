import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Home from '../components/Home';
import Signin from '../components/Signin';
import ManageUsers from '../components/admin/ManageUsers';

function App() {
  return (
    <div className='App'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/admin/manageusers' element={<ManageUsers />} />
      </Routes>
    </div>
  )
}

export default App
