import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({hostaddress, user}) {
  return (
    <div className='navpills my-3 border-bottom pb-3 px-3'>
        <ul className="nav nav-underline">
            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle text-dark active" aria-current="page" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">Users</a>
                <ul className="dropdown-menu">
                    <li><Link className='dropdown-item' to='/admin/manageusers'>Manage Users</Link></li>
                    <li><Link className='dropdown-item' to='/admin/addusers'>Add User</Link></li>
                </ul>
            </li>
            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle text-dark" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">Games</a>
                <ul className="dropdown-menu">
                    <li><Link className='dropdown-item' to='/admin/managegames'>Manage Games</Link></li>
                    <li><Link className='dropdown-item' to='/admin/addgames'>Add Game</Link></li>
                </ul>
            </li>
            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle text-dark" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">Wordbank</a>
                <ul className="dropdown-menu">
                    <li><Link className='dropdown-item' to='/admin/managegames'>Manage Wordbank</Link></li>
                    <li><Link className='dropdown-item' to='/admin/addgames'>Add Words</Link></li>
                </ul>
            </li>
        </ul>
    </div>
    )
} 

export default Navbar