import React from 'react';
import { Footer, NowShowing, UpCommingMovies , Trailers} from '../../containers';
import { Navbar } from '../../components';

const News = () => {
  return (
    <div className='LiveEvents'>
      <div className='gradient_bg'>
        <Navbar />
      </div>
      <div className='live-events-content'>
        <Trailers/>
        <hr />
        <NowShowing />
        <hr />
        <UpCommingMovies />
      </div>
      <Footer />
    </div>
  );
}

export default News;
