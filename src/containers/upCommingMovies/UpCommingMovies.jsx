import React, { useEffect, useState } from 'react';
import './UpCommingMovies.css';
import axios from 'axios';

const UpCommingMovies = () => {
  const [upcomingMovies, setUpcomingMovies] = useState([]);

  useEffect(() => {
    fetchUpcomingMovies();
  }, []);

  const fetchUpcomingMovies = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/upcoming-movies/latest');
      setUpcomingMovies(response.data.upcomingmovie);
    } catch (error) {
      console.error('Error fetching upcoming movies:', error);
    }
  };

  return (
    <section className='upcoming-movies'>
      <h2>Upcoming Movies</h2>
      <div className={`upcoming-movies-container ${Array.isArray(upcomingMovies) && upcomingMovies.length === 1 ? 'single-movie' : ''}`}>
        {Array.isArray(upcomingMovies) && upcomingMovies.length > 0 ? (
          upcomingMovies.slice(0, 2).map(movie => (
            <div key={movie.id} className='movie-card animate__animated animate__fadeInUp'>
              <img src={movie.image} alt={movie.title} />
              <div className='movie-info'>
                <h3>{movie.title}</h3>
                <p>{movie.description}</p>
                <p>Release Date: {movie.date}</p>
                <p>Duration: {movie.duration}</p>
                <p>Category: {movie.category}</p>
                <p>Ticket Price: {movie.price}</p>
                <p><a href={movie.wikipediaLink}>Wikipedia</a></p>
              </div>
            </div>
          ))
        ) : (
          <p>No upcoming movies available at the moment.</p>
        )}
      </div>
    </section>
  );
};

export default UpCommingMovies;
