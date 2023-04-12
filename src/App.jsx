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
import ManageGames from '../components/admin/ManageGames';
import AddGames from '../components/admin/AddGames';
import ManageWordbank from '../components/admin/ManageWordbank';
import AddWords from '../components/admin/AddWords';
import PrivateRouteAdmin from './routes/PrivateRouteAdmin';

let loguser;
localStorage.getItem("user") ? loguser = localStorage.getItem("user") : loguser = "";

let logadmin;
localStorage.getItem("admin") ? logadmin = localStorage.getItem("admin") : logadmin = "";

function App() {  

  const [user, setUser] = useState(loguser);
  const [admin, setAdmin] = useState(logadmin);
  const hostaddress = "localhost";
// const hostaddress = "192.168.20.11";

  return (
    <div className='App'>
      <Navbar hostaddress={hostaddress} user={user} />
      <Routes>
        <Route path='/' element={<Home hostaddress={hostaddress} />} />
        <Route path='/home' element={<Home hostaddress={hostaddress} />} />
        <Route element={<PrivateRouteUser hostaddress={hostaddress} user={user} />}>
          <Route path='/test' element={<Test/>}/>
          <Route path='/play' element={<Gameplay />}/>
        </Route>
        <Route path='/signin' element={<Signin hostaddress={hostaddress} user={user} />}/>

        <Route element={<PrivateRouteAdmin hostaddress={hostaddress} user={user} admin={admin} />}>
          <Route path='/admin/manageusers' element={<ManageUsers hostaddress={hostaddress} />} />
          <Route path='/admin/addusers' element={<AddUsers hostaddress={hostaddress} />} />
          <Route path='/admin/managegames' element={<ManageGames hostaddress={hostaddress} />} />
          <Route path='/admin/addgames' element={<AddGames hostaddress={hostaddress} />} />
          <Route path='/admin/managewordbank' element={<ManageWordbank hostaddress={hostaddress} />} />
          <Route path='/admin/addwords' element={<AddWords hostaddress={hostaddress} />} />
        </Route>

        

      </Routes>
    </div>
  )
}

export default App
