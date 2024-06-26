import React, { useState } from 'react';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import logo from '../../assest/logo.png'
import './navbar.css';
import { Link } from 'react-router-dom';


const Navbar = () => {
  const[toggleMenu, setToggleMenu] = useState(false);

  return (
    <div className='navbar'>
      <div className='navbar-links'>
        <div className='navbar-links_logo'>
          <img src={logo} alt='logo'/>
        </div>
        <div className='navbar-links-container'>
        </div>
      </div>
      <div className='navbar-sign'>
        <button type='button'><Link to='/'>Back To Home</Link></button>
      </div>
      <div className='navbar-menu'>
        {toggleMenu
          ? <RiCloseLine color="#fff" size ={27} onClick={()=> setToggleMenu(false)}/>
          : <RiMenu3Line color="#fff" size ={27} onClick={()=> setToggleMenu(true)}/>
        }
        {toggleMenu && (
          <div className='navbar-menu_container scale-up-center'>
            <div className='navbar-menu_container-links'>
              <div className='navbar-menu_container-links-sign'>
                <button type='button'><Link to='/'>Back To Home</Link></button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar