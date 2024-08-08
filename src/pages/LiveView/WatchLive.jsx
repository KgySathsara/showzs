import React from 'react';
import { Footer , LiveWatchEvent } from '../../containers';
import { Navbar } from '../../components';
const WatchLive = () => {
  return (
    <div className='watch-movie'>
      <div className='gradient_bg'>
        <Navbar />
      </div>
      <div className='watch-movie-content'>
        <LiveWatchEvent />
      </div>
      <Footer />
    </div>
  )
}

export default WatchLive;