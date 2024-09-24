import React from 'react';
import { Footer, MovieDetails, Stream } from '../../containers';
import { Navbar } from '../../components';

const Movies = () => {
  return (
    <div className='LiveEvents'>
      <div className='gradient_bg'>
        <Navbar />
      </div>
      <div className='live-events-content'>
        <MovieDetails />
      </div>
      {/* <Stream /> */}
      <Footer />
    </div>
  );
}

export default Movies;
