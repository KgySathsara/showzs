import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ticket from '../../assest/ticket.jpg';
import './movieDetails.css';

const MovieDetails = () => {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/movie');
        console.log('Movie data:', response.data);
        setMovie(response.data);
      } catch (error) {
        console.error('Failed to fetch movie data:', error);
      }
    };

    fetchMovie();
  }, []);

  if (!movie) {
    return null; 
  }

  return (
    <section className='movie-details'>
      <div className='movie-info'>
        <h1>{movie.title || ''}</h1>
        <p>{`Directed by: ${movie.director}` || ''}</p>
        <p>{`Genre: ${movie.genre}` || ''} </p>
        <p>{`Duration: ${movie.duration} Min` || ''}</p>
        <div className="movie-actions">
          <img src={ticket} alt="Ticket" className='ticketImg' />
          <button className="watch-trailer">Watch Trailer</button>
        </div>
      </div>
      <div className='movie-poster'>
        <div className="poster-container">
          {movie.picture_url ? (
            <img src={`http://127.0.0.1:8000${movie.picture_url}`} alt={movie.title} />
          ) : null}
          <div className="movie-details-overlay"> 
            <h2>{`${movie.title} - The Movie` || ''}</h2>
            <p>{`Directed by ${movie.director}` || ''}</p>
            <p>{`Genre: ${movie.genre}` || ''} </p>
            <p>{`Duration: ${movie.duration} Min` || ''}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MovieDetails;
