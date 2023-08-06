import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='nav'>
        <NavLink activeClassName="active" to={'/'} className={'site-title'}>Dashboard</NavLink>
        <ul>
            <li><NavLink activeClassName="active" to={'/about'}>About</NavLink></li>
            <li><NavLink activeClassName="active" to={'/contact'}>Contact</NavLink></li>
            <li><NavLink activeClassName="active" to={'/register'}>Register</NavLink></li>
            <li><NavLink activeClassName="active" to={'/login'}>Login</NavLink></li>
            <li><NavLink activeClassName="active" to={'/profile'}>Profile</NavLink></li>
        </ul>
    </nav>
  )
}

export default Navbar