import React from 'react';
import { Footer, NowShowing, UpCommingMovies} from '../../containers';
import { Navbar } from '../../components';
// import './LiveEvents.css';

const News = () => {
  return (
    <div className='LiveEvents'>
      <div className='gradient_bg'>
        <Navbar />
      </div>
      <div className='live-events-content'>
        <NowShowing />
        <hr />
        <UpCommingMovies />
      </div>
      <Footer />
    </div>
  );
}

export default News;
