import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ticket from '../../assest/ticket.jpg';
import './movieDetails.css';

const MovieDetails = () => {
  const [movie, setMovie] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/movie')
      .then(response => {
        console.log('Movie data:', response.data);
        setMovie(response.data);
      })
      .catch(error => {
        console.error('Failed to fetch movie data:', error);
      });
  }, []);

  const handleWatchTrailer = () => {
    if (movie && movie.trailer) {
      setShowModal(true);
    } else {
      console.error('No valid trailer URL found:', movie?.trailer);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <section className='movie-details'>
      {movie ? (
        <>
          <div className='movie-info'>
            <h1>{movie.title}</h1>
            <p>{`Directed by: ${movie.director}`}</p>
            <p>{`Genre: ${movie.genre}`}</p>
            <p>{`Duration: ${movie.duration} Min`}</p>
            <div className="movie-actions">
              <img src={ticket} alt="Ticket" className='ticketImg' />
              <button className="watch-trailer" onClick={handleWatchTrailer}>Watch Trailer</button>
            </div>
          </div>
          <div className='movie-poster'>
            <div className="poster-container">
              {movie.picture && (
                <img src={movie.picture} alt={movie.title} />
              )}
              <div className="movie-details-overlay">
                <h2>{`${movie.title} - The Movie`}</h2>
                <p>{`Directed by ${movie.director}`}</p>
                <p>{`Genre: ${movie.genre}`}</p>
                <p>{`Duration: ${movie.duration} Min`}</p>
              </div>
            </div>
          </div>

          {showModal && movie.trailer && (
            <div className="modal-overlay">
              <div className="modal-content">
                <span className="close-button" onClick={handleCloseModal}>&times;</span>
                <video controls src={movie.trailer} alt="Movie Trailer" />
              </div>
            </div>
          )}
        </>
      ) : (
        <p>No movie details available at the moment.</p>
      )}
    </section>
  );
};

export default MovieDetails;
