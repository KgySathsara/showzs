import React from 'react';
import './LiveWatchEvent.css';
import sinhabahufilm from '../../assest/sinhabahuTrailer.mp4';

const LiveWatchEvent = () => {
    return (
        <section className='movie-watch'>
          <h2>Live Watch</h2>
          <div className='movie-watch-container'>
            <video controls src={sinhabahufilm} alt="Sinhabahu Trailer" />
          </div>
        </section>
      );
}

export default LiveWatchEvent;