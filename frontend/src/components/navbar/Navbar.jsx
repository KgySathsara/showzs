import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
            {['Home', 'Movies', 'Movie View' , 'Live View' , 'Live Events', 'News', 'Contact Us'].map((item, index) => (
              <li 
                key={index} 
                className={`navItem ${activeIndex === index ? 'active' : ''}`} 
                onClick={() => handleClick(index)}
              >
                <Link to={item === 'Home' ? '/' : `/${item.replace(' ', '')}`} className="navLink">
                  {item}
                </Link>
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
