import React from 'react';
import { Footer, Events } from '../../containers';
import { Navbar } from '../../components';
// import './LiveEvents.css';

const LiveEvents = () => {
  return (
    <div className='LiveEvents'>
      <div className='gradient_bg'>
        <Navbar />
      </div>
      <div className='live-events-content'>
        <Events />
      </div>
      <Footer />
    </div>
  );
}

export default LiveEvents;
