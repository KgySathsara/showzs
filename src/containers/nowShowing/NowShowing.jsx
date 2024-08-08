import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './nowShowing.css'

const NowShowing = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/movies')
      .then(response => {
        console.log('API response:', response.data); // Log the response
        let responseData = response.data;
        if (!Array.isArray(responseData)) {
          responseData = [responseData];
        }

        // Sort by date descending and take the first 2 movies
        const sortedMovies = responseData.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 2);

        setMovies(sortedMovies);
      })
      .catch(error => {
        console.error('There was an error fetching the movies!', error);
      });
  }, []);

  return (
    <section className="now-showing">
      <div className="now-showing-container">
        <h2>Now Showing</h2>
        <div className="movie-container">
          {movies.length > 0 ? (
            movies.map(movie => (
              <div className="movie-card animate__animated animate__fadeInUp" key={movie.id}>
                <img src={movie.picture} alt={movie.title} />
                <div className="movie-info">
                  <h3>{movie.title}</h3>
                  <p>{movie.genre} - {movie.director}</p>
                  <p>Duration: {movie.duration} minutes</p>
                  <p>Price: ${movie.price}</p>
                  <p>Stream: <a href={movie.stream_link} target="_blank" rel="noopener noreferrer">{movie.stream_link}</a></p>
                </div>
              </div>
            ))
          ) : (
            <p>No movies available.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default NowShowing;
