import React from 'react';
import './nowShowing.css';
import visalAdarePoster from '../../assest/visaladarenews.jpg';
import sinhabahuPoster from '../../assest/sinhabahu.jpg';

const NowShowing = () => {
  return (
    <section className='now-showing'>
      <h2>Now Showing</h2>
      <div className='now-showing-container'>
        <div className='movie-card animate__animated animate__fadeInLeft'>
          <img src={visalAdarePoster} alt="Visal Adare Poster" />
          <div className='movie-info'>
            <h3>Visal Adare - The Movie</h3>
            <p>18176 likes - 1995 talking about this</p>
            <p>Embark on an emotional rollercoaster of friendship, love, heartbreak, laughter, and joy...</p>
          </div>
        </div>
        <div className='movie-card animate__animated animate__fadeInRight'>
          <img src={sinhabahuPoster} alt="Sinhabahu Poster" />
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

export default NowShowing;