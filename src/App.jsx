import React, {useState} from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Home from '../components/Home';
import Signin from '../components/Signin';
import Test from '../components/Test';
import Gameplay from '../components/Gameplay';
import PrivateRouteUser from './routes/PrivateRouteUser';

import ManageUsers from '../components/admin/ManageUsers';
import AddUsers from '../components/admin/AddUsers';

let loguser;
localStorage.getItem("user") ? loguser = localStorage.getItem("user") : loguser = "";

function App() {
  

  const [user, setUser] = useState(loguser);

  return (
    <div className='App'>
      <Navbar user={user} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route element={<PrivateRouteUser user={user} />}>
          <Route path='/test' element={<Test/>}/>
          <Route path='/play' element={<Gameplay />}/>
        </Route>
        <Route path='/signin' element={<Signin user={user} />}/>
          
        <Route path='/admin/manageusers' element={<ManageUsers />} />
        <Route path='/admin/addusers' element={<AddUsers />} />
        
      </Routes>
    </div>
  )
}

export default App
