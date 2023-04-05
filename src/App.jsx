import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Home from '../components/Home';
import Signin from '../components/Signin';
import ManageUsers from '../components/admin/ManageUsers';
import Test from '../components/Test';

function App() {
  return (
    <div className='App'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/admin/manageusers' element={<ManageUsers />} />
        <Route path='/test' element={<Test />}></Route>
      </Routes>
    </div>
  )
}

export default App
