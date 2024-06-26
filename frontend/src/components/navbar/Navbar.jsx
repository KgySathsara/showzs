import React, { useState } from 'react';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import logo from '../../assest/logo.png'
import './navbar.css';
import { Link } from 'react-router-dom';

const Menu = () => (
  <>
  <p><a href='#home'>Home</a></p>
  <p><a href='#wgpt3'>Movies</a></p>
  <p><a href='#possibility'>Cinemas</a></p>
  <p><a href='#features'>Contact Us</a></p>
  </>
)

const Navbar = () => {
  const[toggleMenu, setToggleMenu] = useState(false);

  return (
    <div className='navbar'>
      <div className='navbar-links'>
        <div className='navbar-links_logo'>
          <img src={logo} alt='logo'/>
        </div>
        <div className='navbar-links-container'>
          <Menu/>
        </div>
      </div>
      <div className='navbar-sign'>
        <button type='button'><Link to='/seatBooking'>Book Tickets</Link></button>
      </div>
      <div className='navbar-menu'>
        {toggleMenu
          ? <RiCloseLine color="#fff" size ={27} onClick={()=> setToggleMenu(false)}/>
          : <RiMenu3Line color="#fff" size ={27} onClick={()=> setToggleMenu(true)}/>
        }
        {toggleMenu && (
          <div className='navbar-menu_container scale-up-center'>
            <div className='navbar-menu_container-links'>
              <Menu/>
              <div className='navbar-menu_container-links-sign'>
                <button type='button'><Link to='/seatBooking'>Book Tickets</Link></button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar