import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './stream.css';

const Stream = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/movies');
        setMovies(response.data);
        
      } catch (error) {
        console.error('Failed to fetch movies:', error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <section className='stream'>
      <div className='stream-container'>
        <hr/>
        <h1>Now Streaming</h1>
        <div className="movie-container">
          {movies.map((movie) => (
            <div className="movie" key={movie.id}>
              {movie.picture ? (
             <img src={`http://127.0.0.1:8000/images/${movie.picture}`} alt={movie.title} />
          ) : null}
              <h2>{movie.title}</h2>
              <p>{movie.duration} min</p>
              <div className="buttons">
                <button className="watch-trailer">Watch Trailer</button>
                <button className="buy-tickets">Buy Tickets</button>
              </div>
            </div>
          ))}
        </div>
        <hr/>
      </div>
    </section>
  );
};

export default Stream;