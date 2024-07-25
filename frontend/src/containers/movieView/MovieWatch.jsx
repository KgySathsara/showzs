import React from 'react';
import './moviewatch.css';
import ReactPlayer from 'react-player'

const MovieWatch = () => {
  return (
    <section className='movie-watch'>
      <h2>Watch Movie</h2>
      <div className='movie-watch-container'>
        <ReactPlayer url='https://www.youtube.com/watch?v=28oPwzIbAyY' />
      </div>
    </section>
  );
}

export default MovieWatch