import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div className='navbar'>
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <Link className='navbar-brand' to='/home'>Navbar</Link>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
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