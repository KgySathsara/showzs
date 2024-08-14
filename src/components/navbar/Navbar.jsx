import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle, FaCaretDown } from "react-icons/fa";
import logo from '../../assest/logo.png';
import './navbar.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navbar = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [showSubNav, setShowSubNav] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
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

  const handleClick = (index, e) => {
    if (index === 2) {
      e.preventDefault();
      handleDropdownClick(index);
    } else {
      setActiveIndex(index);
      setShowSubNav(false);
    }
  };

  const handleSignOut = () => {
    sessionStorage.removeItem('userRole');
    setIsAuthenticated(false);
    toast.success('Sign Out Successful');
    navigate('/login');
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
                onMouseEnter={() => item === 'Shows' && handleDropdownClick(index)}
                onMouseLeave={() => item === 'Shows' && setShowSubNav(false)}
              >
                <Link
                  to={item === 'Home' ? '/' : `/${item.replace(' ', '')}`}
                  className="navLink"
                  onClick={(e) => handleClick(index, e)}
                >
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
            <Link to="/login" className="signin flex">
              <p><FaUserCircle className="icon" /> Sign in</p>
            </Link>
          )}
        </div>
      </header>
      <ToastContainer />
    </section>
  );
};

export default Navbar;
