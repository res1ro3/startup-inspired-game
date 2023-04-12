import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';

function Navbar({hostaddress, user}) {

  const [accountType, setAccountType] = useState("");

  useEffect(()=> {
    setAccountType(sessionStorage.getItem("accountType"));
  })

  const signOut = async(event) => {
    event.preventDefault();

    await axios.post("http://"+hostaddress+":80/startup-inspired-game/api/signout.php", {
      email: localStorage.getItem("user")
    })
    .then((res) => {
        sessionStorage.removeItem("accountType");
        localStorage.removeItem("user");
        alert(res.data);
        window.location.reload();
    })
  }
  return (
    <div className='navbar'>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className='navbar-brand' to='/home'>GuessIt Game</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li><Link className='nav-link' to='/home'>Home</Link></li>
              {user ? <li className='nav-link' style={{cursor: "pointer"}} onClick={signOut}>Sign Out</li> : <li><Link className='nav-link' to='/signin'>Sign In</Link></li>}
              {accountType === "Admin" ? <li><Link className='nav-link' to='/admin/manageusers'>Admin</Link></li> : ""}
            </ul>
          </div>
        </div>
      </nav>
    </div>
    )
} 

export default Navbar