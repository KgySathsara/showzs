import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './stream.css';

const Stream = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/movies')
      .then(response => {
        console.log('API response:', response.data); // Log the response
        if (response.status === 200) {
          let responseData = response.data;
  
          // Ensure responseData is an array
          if (!Array.isArray(responseData)) {
            responseData = [responseData];
          }
  
          // Sort by date descending
          const sortedMovies = responseData.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 2);
  
          setMovies(sortedMovies);
        } else {
          console.error('No movies found:', response.data.error);
        }
      })
      .catch(error => {
        console.error('There was an error fetching the movies!', error);
      });
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
             <img src={movie.picture} alt={movie.title} />
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