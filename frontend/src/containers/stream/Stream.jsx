import React from 'react'
import movie1 from '../../assest/wisal.jpg'
import movie2 from '../../assest/sinhabahu.jpg'
import './stream.css';

const Stream = () => {
  return (
    <section className='stream'>
      <div className='stream-container'>
      <hr/>
        <h1>Now Streaming</h1>
          <div className="movie-container">
            <div className="movie">
              <img src={ movie1 } alt="Visal ADare" />
              <h2>Visal Adare</h2>
              <p>3hr 30Min</p>
              <div className="buttons">
                <button className="watch-trailer"><a href="/#">Watch Trailer</a></button>
                <button className="buy-tickets"><a href="/LiveEvents">Buy Tickets</a></button>
              </div>
            </div>
            <div className="movie">
              <img src= { movie2 } alt="Sinhabahu" />
              <h2>Sinhabahu</h2>
              <p>3hr 30Min</p>
              <div className="buttons">
                <button className="watch-trailer"><a href="/#">Watch Trailer</a></button>
                <button className="buy-tickets"><a href="/LiveEvents">Buy Tickets</a></button>
              </div>   
            </div>
          </div>
          <hr/>
      </div>
    </section>
  )
}

export default Stream;