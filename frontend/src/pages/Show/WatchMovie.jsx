import React from 'react';
import { Footer , MovieWatch } from '../../containers';
import { Navbar } from '../../components';
const WatchMovie = () => {
  return (
    <div className='watch-movie'>
      <div className='gradient_bg'>
        <Navbar />
      </div>
      <div className='watch-movie-content'>
        <MovieWatch />
      </div>
      <Footer />
    </div>
  )
}

export default WatchMovie