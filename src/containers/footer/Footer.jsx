import React from 'react';
import './footer.css';
import logo from '../../assest/logo.png';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaYoutube, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className="footer section_padding">
      <div className="footer-heading">
        <h1 className="gradient_text">Do you want to step in to the theater before others</h1>
      </div>

      <div className="footer-btn">
        <p>Request Early Access</p>
      </div>

      <div className="footer-links">
        <div className="footer-link_logo">
          <img src={logo} alt="logo" />
          <div className="footer-social-icons">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebookF />
            </a>
            <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
              <FaYoutube />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
          </div>
        </div>

        <div className="footer-link_div">
          <h4>Links</h4>
          <p>Overons</p>
          <p>Counters</p>
        </div>

        <div className="footer-link_div">
          <h4>Company</h4>
          <p><Link to="/TermsAndConditions">Terms & Conditions</Link></p>
          <p><Link to="/PrivacyPolicy">Privacy Policy</Link></p> 
          <p><Link to="/RefundPolicy">Refund Policy</Link></p>
          <p><Link to="/Contactus">Contact</Link></p> 
        </div>

        <div className="footer-link_div">
          <h4>Get in touch</h4>
          <p>Global Mesh Solutions (Pvt) Ltd.No- 7B, Floor 25 1/2, Ocean Tower Building, Station Road, Colombo 04, Srilanka 00400.</p>
          <p>(+94)76-5299400</p>
          <p>Info@Globalmeshsolutions.com</p>
        </div>
      </div>

      <div className="footer-copyright">
        <p>2024 Movie. All right reserved</p>
      </div>
    </div>
  );
};

export default Footer;
