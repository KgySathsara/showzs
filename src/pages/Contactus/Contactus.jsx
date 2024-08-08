import React from 'react';
import { Footer, ContactForm } from '../../containers';
import { Navbar } from '../../components';
// import './LiveEvents.css';

const Contactus = () => {
  return (
    <div className='LiveEvents'>
      <div className='gradient_bg'>
        <Navbar />
      </div>
      <div className='live-events-content'>
        <ContactForm />
      </div>
      <Footer />
    </div>
  );
}

export default Contactus;
