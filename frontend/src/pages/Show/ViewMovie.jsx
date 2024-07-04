import React from 'react';
import { Footer , MovieView } from '../../containers';
import { Navbar } from '../../components';

const ViewMovie = () => {
  return (
    <div className='watch-movie'>
      <div className='gradient_bg'>
        <Navbar />
      </div>
      <div className='watch-movie-content'>
        <MovieView />
      </div>
      <Footer />
    </div>
  )
}

export default ViewMovie