import React from 'react';
import './footer.css';
import logo from '../../assest/logo.png'

const Footer = () => {
  return (
    <div className="footer section_padding">
      <div className="footer-heading">
        <h1 className='gradient_text'>Do you want to step in to the theater before others</h1>
      </div>

      <div className='footer-btn'>
        <p>Request Early Access</p>
      </div>

      <div className='footer-links'>
        <div className="footer-link_logo">
          <img src={logo} alt="logo" />
        </div>

        <div className="footer-link_div">
          <h4>Links</h4>
          <p>Overons</p>
          <p>Social Media</p>
          <p>Counters</p>
          <p>Contact</p>
        </div>

        <div className="footer-link_div">
          <h4>Company</h4>
          <p>Terms & Conditions</p>
          <p>Provacy Policy</p>
          <p>Contact</p>
          <p>Other</p>
        </div>

        <div className="footer-link_div">
          <h4>Get in touch</h4>
          <p>Kandy, Srilanka</p>
          <p>(+94)75-8695632</p>
          <p>info@payment.com</p>
        </div>
      </div>

      <div className="footer-copyright">
        <p>2023 Movie. All right reserved</p>
      </div>
    </div>
  )
}

export default Footer