import React from 'react';
import './header.css';
import banner from '../../assest/banner.jpg';
import card1 from '../../assest/wisal.jpg';
import card2 from '../../assest/youth.jpg';
import ticket from '../../assest/ticket.jpg';

const Header = () => {
  return (
    <section className='header'>
      <div className='header-container'>
        <div className="overlay"></div>
        <img src={banner} alt="Banner" />
        <div className="card-overlay">
          <div className="card">
            <img src={card1} alt="Wisal Card" />
          </div>
          <div className="card">
            <img src={card2} alt="Youth Card" />
          </div>
        </div>
        <div className='additional-content'>
          <div className='card-description'>
            <div className='card-details'>
              <h3>16th May - 16th June</h3>
            </div>
            <div className='ticket'>
              <img src={ticket} alt='Ticket for Event 1'/>
            </div>
          </div>
          <div className='card-description'>
            <div className='card-details'>
              <h3>Watch Now</h3>
            </div>
            <div className='ticket'>
              <img src={ticket} alt='Ticket for Event 2'/>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Header;
