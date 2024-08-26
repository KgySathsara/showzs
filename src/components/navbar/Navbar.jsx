import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle, FaCaretDown } from "react-icons/fa";
import { MenuOutlined } from '@ant-design/icons';
import { Drawer, Button } from 'antd';
import logo from '../../assest/logo.png';
import './navbar.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navbar = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [showSubNav, setShowSubNav] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userRole = sessionStorage.getItem('userRole');
    setIsAuthenticated(!!userRole);
  }, []);

  const handleDropdownClick = (index) => {
    if (activeIndex === index) {
      setShowSubNav(!showSubNav);
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

  const handleLogoClick = () => {
    setActiveIndex(null);
    navigate('/');
  };

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <section className='navbar'>
      <header className='navbar-links'>
        <div className='navbar-links_logo' onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
          <img src={logo} alt='logo' />
        </div>
        <div className='mobileMenu'>
          <Button type="text" icon={<MenuOutlined />} onClick={showDrawer} />
          <Drawer
            title="Menu"
            placement="right"
            onClose={onClose}
            visible={visible}
          >
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
          </Drawer>
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
              <FaUserCircle className="icon" />
              <p>Sign out</p>
            </Link>
          ) : (
            <Link to="/login" className="signin flex">
              <FaUserCircle className="icon" />
              <p>Sign in</p>
            </Link>
          )}
        </div>

      </header>
      <ToastContainer />
    </section>
  );
};

export default Navbar;
