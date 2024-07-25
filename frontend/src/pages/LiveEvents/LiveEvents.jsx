import React from 'react';
import { Footer, Events, Paybuttons } from '../../containers';
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
        <Paybuttons />
      </div>
      <Footer />
    </div>
  );
}

export default LiveEvents;
