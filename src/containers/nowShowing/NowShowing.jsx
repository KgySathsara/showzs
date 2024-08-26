import React, { useEffect, useState } from 'react';
import './nowShowing.css';
import axios from 'axios';

const NowShowing = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/movies/latest');
      console.log('API Response:', response.data);
      const sortedMovies = response.data.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 2);
      setMovies(sortedMovies);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  return (
    <section className='now-showing'>
      <h2>Now Showing</h2>
      <div className={`now-showing-container ${movies.length === 1 ? 'single-movie' : ''}`}>
        {movies.length === 0 ? (
          <p>No movies available at the moment.</p>
        ) : (
          movies.map(movie => (
            <div className='movie-card animate__animated animate__fadeInLeft' key={movie.id}>
              <img 
                src={movie.picture} 
                alt={movie.title} 
              />
              <div className='movie-info'>
                <h3>{movie.title}</h3>
                <p>Genre: {movie.genre}</p>
                <p>Director: {movie.director}</p>
                <p>Duration: {movie.duration} minutes</p>
                <p>Price: ${movie.price}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default NowShowing;
