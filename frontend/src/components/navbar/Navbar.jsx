import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle, FaCaretDown } from "react-icons/fa";
import logo from '../../assest/logo.png';
import './navbar.css';

const Navbar = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [showSubNav, setShowSubNav] = useState(false);

  const handleDropdownClick = (index) => {
    setActiveIndex(index);
    setShowSubNav(!showSubNav);
  };

  const handleClick = (index) => {
    setActiveIndex(index);
    setShowSubNav(false);
  };

  return (
    <section className='navbar'>
      <header className='navbar-links'>
        <div className='navbar-links_logo'>
          <img src={logo} alt='logo'/>
        </div>
        <div className='navbar-links-container'>
          <ul className="navLists flex">
            {['Home', 'Movies', 'Show', 'Live Events', 'News', 'Contact Us'].map((item, index) => (
              <li 
                key={index} 
                className={`navItem ${activeIndex === index ? 'active' : ''}`} 
                onClick={() => handleClick(index)}
              >
                <Link to={item === 'Home' ? '/' : `/${item.replace(' ', '')}`} className="navLink">
                  {item}
                  {item === 'Show' && (
                    <FaCaretDown 
                      className="dropdown-icon" 
                      onClick={(e) => {
                        e.stopPropagation(); 
                        handleDropdownClick(index);
                      }} 
                    />
                  )}
                </Link>
                {item === 'Show' && showSubNav && activeIndex === index && (
                  <ul className="subNav">
                    <li><Link to="/WatchMovie" className="navLink">Watch Movie</Link></li>
                    <li><Link to="/WatchLive" className="navLink">Watch Live</Link></li>
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className='signin-container'>
          <Link to="/Register" className="signin flex">
            <p><FaUserCircle className="icon" /> Sign in </p>
          </Link>
        </div>
      </header>
    </section>
  )
}

export default Navbar;
