import React from 'react';
import './LiveWatchEvent.css';
import ReactPlayer from 'react-player'

const LiveWatchEvent = () => {
  return (
    <section className='movie-watch'>
      <h2>Live Watch</h2>
      <div className='movie-watch-container'>
        <ReactPlayer url='https://www.youtube.com/watch?v=28oPwzIbAyY' />
      </div>
    </section>
  );
}

export default LiveWatchEvent;