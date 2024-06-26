import React, { useState } from 'react';
import logo from '../../assest/logo.png';
import './navbar.css';
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <section className='navbar'>
      <header className='navbar-links'>
        <div className='navbar-links_logo'>
          <img src={logo} alt='logo'/>
        </div>
        <div className='navbar-links-container'>
          <ul className="navLists flex">
            {['Home', 'Movies', 'Live Events', 'News', 'Contact Us'].map((item, index) => (
              <li 
                key={index} 
                className={`navItem ${activeIndex === index ? 'active' : ''}`} 
                onClick={() => handleClick(index)}
              >
                <a href="/" className="navLink">{item}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className='signin-container'>
          <a href="/" className="signin flex">
            <p><FaUserCircle className="icon" /> Sign in </p>
          </a>
        </div>
      </header>
    </section>
  )
}

export default Navbar;
