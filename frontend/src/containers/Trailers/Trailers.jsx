import React from 'react';
import './trailers.css';
import ReactPlayer from 'react-player'

const Trailers = () => {
  return (
    <section className='now-showing'>
      <h2>Trailers</h2>
      <div className='now-showing-container'>
        <div className='movie-card animate__animated animate__fadeInLeft'>
          <ReactPlayer url='https://www.youtube.com/watch?v=28oPwzIbAyY' />
          <div className='movie-info'>
            <h3>Visal Adare - The Movie</h3>
            <p>18176 likes - 1995 talking about this</p>
            <p>Embark on an emotional rollercoaster of friendship, love, heartbreak, laughter, and joy...</p>
          </div>
        </div>
        <div className='movie-card animate__animated animate__fadeInRight'>
          <ReactPlayer url='https://www.youtube.com/watch?v=28oPwzIbAyY' />
          <div className='movie-info'>
            <h3>Sinhabahu</h3>
            <p>50K+ Views</p>
            <p>Sinhabahu, is a 2024 Sri Lankan Sinhalese historical thriller film directed by Somaratne Dissanayake and co-produced by Gamini Wickramasinghe and Renuka Balasuriya. The film is based on the legend in the Mahāvamsa where playwright Ediriweera Sarachchandra produced a stage drama under the same title. <a href="https://en.wikipedia.org/wiki/Sinhabahu">Wikipedia</a></p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Trailers;
