import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle, FaCaretDown } from "react-icons/fa";
import logo from '../../assest/logo.png';
import './navbar.css';

const Navbar = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [showSubNav, setShowSubNav] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is authenticated
    const userRole = sessionStorage.getItem('userRole');
    if (userRole) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleDropdownClick = (index) => {
    if (activeIndex === index && showSubNav) {
      setShowSubNav(false);
    } else {
      setActiveIndex(index);
      setShowSubNav(true);
    }
  };

  const handleClick = (index) => {
    setActiveIndex(index);
    if (index === activeIndex && showSubNav) {
      setShowSubNav(false);
    } else {
      setShowSubNav(true);
    }
  };

  const handleSignOut = () => {
    sessionStorage.removeItem('userRole'); // Clear user session
    setIsAuthenticated(false);
    navigate('/login'); // Redirect to login page
  };

  return (
    <section className='navbar'>
      <header className='navbar-links'>
        <div className='navbar-links_logo'>
          <img src={logo} alt='logo' />
        </div>
        <div className='navbar-links-container'>
          <ul className="navLists flex">
            {['Home', 'Movies', 'Shows', 'Live Events', 'News', 'Contact Us'].map((item, index) => (
              <li
                key={index}
                className={`navItem ${activeIndex === index ? 'active' : ''}`}
                onClick={() => handleClick(index)}
                onMouseEnter={() => item === 'Shows' && handleDropdownClick(index)}
                onMouseLeave={() => item === 'Shows' && setShowSubNav(false)}
              >
                <Link to={item === 'Home' ? '/' : `/${item.replace(' ', '')}`} className="navLink">
                  {item}
                  {item === 'Shows' && (
                    <FaCaretDown
                      className="dropdown-icon"
                      onClick={(e) => {
                        e.preventDefault();
                        handleDropdownClick(index);
                      }}
                    />
                  )}
                </Link>
                {item === 'Shows' && showSubNav && activeIndex === index && (
                  <ul className="subNavLists">
                    <li className="subNavItem"><Link to="/WatchMovie" className="navLink">Watch Movies</Link></li>
                    <li className="subNavItem"><Link to="/WatchLive" className="navLink">Watch Live</Link></li>
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className='signin-container'>
          {isAuthenticated ? (
            <Link
              to="/login"
              className="signin flex"
              onClick={(e) => {
                e.preventDefault();
                handleSignOut();
              }}
            >
              <p><FaUserCircle className="icon" /> Sign out</p>
            </Link>
          ) : (
            <Link to="/Register" className="signin flex">
              <p><FaUserCircle className="icon" /> Sign in</p>
            </Link>
          )}
        </div>
      </header>
    </section>
  );
};

export default Navbar;
