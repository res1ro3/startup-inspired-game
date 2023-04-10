import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
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
              <li><Link className='nav-link active' to='/home'>Home</Link></li>
              <li><Link className='nav-link' to='/signin'>Sign In</Link></li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
    )
} 

export default Navbar