import React from 'react';
import './moviewatch.css';
import sinhabahufilm from '../../assest/sinhabahuTrailer.mp4';

const MovieWatch = () => {
    return (
        <section className='movie-watch'>
          <h2>Watch Movie</h2>
          <div className='movie-watch-container'>
            <video controls src={sinhabahufilm} alt="Sinhabahu Trailer" />
          </div>
        </section>
      );
}

export default MovieWatch