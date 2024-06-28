import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assest/logo.png';
import './navbar.css';
// import { FaUserCircle } from "react-icons/fa";

const Adminnavbar = () => {
    const [activeIndex, setActiveIndex] = useState(null);
    const [activeSubIndex, setActiveSubIndex] = useState(null);
    const [activeSubSubIndex, setActiveSubSubIndex] = useState(null);

    const handleMainClick = (index) => {
        if (activeIndex === index) {
            setActiveIndex(null);
            setActiveSubIndex(null);
            setActiveSubSubIndex(null);
        } else {
            setActiveIndex(index);
            setActiveSubIndex(null);
            setActiveSubSubIndex(null);
        }
    };

    const handleSubClick = (subIndex) => {
        if (activeSubIndex === subIndex) {
            setActiveSubIndex(null);
            setActiveSubSubIndex(null);
        } else {
            setActiveSubIndex(subIndex);
            setActiveSubSubIndex(null);
        }
    };

    const handleSubSubClick = (subSubIndex) => {
        setActiveSubSubIndex(subSubIndex);
    };

    const handleMouseLeave = () => {
        setActiveIndex(null);
        setActiveSubIndex(null);
        setActiveSubSubIndex(null);
    };

    const handleMainHover = (index) => {
        if (activeIndex !== index) {
            setActiveIndex(index);
        }
    };

    const handleSubHover = (subIndex) => {
        if (activeSubIndex !== subIndex) {
            setActiveSubIndex(subIndex);
        }
    };

    const handleSubSubHover = (subSubIndex) => {
        if (activeSubSubIndex !== subSubIndex) {
            setActiveSubSubIndex(subSubIndex);
        }
    };

    const navItems = [
        { 
            title: 'Home', 
            subtitles: [
                { title: 'Dashboard', subSubtitles: ['Overview', 'Analytics', 'Notifications'] }
            ]
        },
        { 
            title: 'Movie Management', 
            subtitles: [
                { title: 'Movies List', subSubtitles: ['View Movies', 'Search/Filter Movies', 'Add New Movie'] },
                { title: 'Categories', subSubtitles: ['View All Categories', 'Add New Category', 'Edit Category', 'Delete Category'] }
            ]
        },
        { 
            title: 'Live Events Management', 
            subtitles: [
                { title: 'Events List', subSubtitles: ['View Event', 'Search/Filter Events', 'Add New Event'] },
                { title: 'Categories', subSubtitles: ['View All Categories', 'Add New Category', 'Edit Category', 'Delete Category'] }
            ]
        },
        { 
            title: 'News Management', 
            subtitles: [
                { title: 'Movie News List', subSubtitles: ['View All Articles', 'Search/Filter Articles', 'Add New Article'] },
                { title: 'Categories', subSubtitles: ['View All Categories', 'Add New Category', 'Edit Category', 'Delete Category'] }
            ]
        },
        { 
            title: 'Contact Us', 
            subtitles: [
                { title: 'Messages', subSubtitles: ['View All Messages', 'Search/Filter Messages', 'Respond to Message', 'Delete Message'] },
                { title: 'FAQs', subSubtitles: ['View All FAQs', 'Add New FAQ', 'Edit FAQ', 'Delete FAQ'] }
            ]
        }
    ];

    return (
        <section className='navbar'>
            <header className='navbar-links'>
                <div className='navbar-links_logo'>
                    <img src={logo} alt='logo'/>
                </div>
                <div className='navbar-links-container'>
                    <ul className="navLists flex">
                        {navItems.map((item, index) => (
                            <li 
                                key={index} 
                                className={`navItem ${activeIndex === index ? 'active' : ''}`} 
                                onMouseEnter={() => handleMainHover(index)}
                                onClick={() => handleMainClick(index)}
                                onMouseLeave={handleMouseLeave}
                            >
                                <span className="navLink">
                                    {item.title}
                                </span>
                                {activeIndex === index && (
                                    <ul className="subNavLists">
                                        {item.subtitles.map((subtitle, subIndex) => (
                                            <li 
                                                key={subIndex} 
                                                className={`subNavItem ${activeSubIndex === subIndex ? 'active' : ''}`}
                                                onMouseEnter={() => handleSubHover(subIndex)}
                                                onClick={() => handleSubClick(subIndex)}
                                                onMouseLeave={handleMouseLeave}
                                            >
                                                <span className="subNavLink">
                                                    {subtitle.title}
                                                </span>
                                                {activeSubIndex === subIndex && (
                                                    <ul className="subSubNavLists">
                                                        {subtitle.subSubtitles.map((subSubtitle, subSubIndex) => (
                                                            <li 
                                                                key={subSubIndex} 
                                                                className={`subSubNavItem ${activeSubSubIndex === subSubIndex ? 'active' : ''}`}
                                                                onMouseEnter={() => handleSubSubHover(subSubIndex)}
                                                                onClick={() => handleSubSubClick(subSubIndex)}
                                                            >
                                                                <Link to={`/${item.title.replace(/ /g, '')}/${subtitle.title.replace(/ /g, '')}/${subSubtitle.replace(/ /g, '')}`} className="subSubNavLink">
                                                                    {subSubtitle}
                                                                </Link>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
                {/* <div className='signin-container'>
                    <Link to="/Register" className="signin flex">
                        <p><FaUserCircle className="icon" /> Sign in </p>
                    </Link>
                </div> */}
            </header>
        </section>
    );
};

export default Adminnavbar;
