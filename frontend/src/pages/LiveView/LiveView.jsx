import React from 'react';
import { Footer } from '../../containers';
import { LiveViewEvent } from '../../containers';
import { Navbar } from '../../components';
// import './LiveEvents.css';

const LiveView = () => {
  return (
    <div className='LiveEvents'>
      <div className='gradient_bg'>
        <Navbar />
      </div>
      <div className='live-events-content'>
        <LiveViewEvent />
      </div>
      <Footer />
    </div>
  );
}

export default LiveView;
