import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ticket from '../../assest/ticket.jpg';
import { ArrowRightOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './movieDetails.css';

const MovieDetails = () => {
  const [movie, setMovie] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if there is a selected movie in sessionStorage
    const selectedMovie = sessionStorage.getItem('selectedItem');

    if (selectedMovie) {
      // If a movie is found in sessionStorage, use it
      setMovie(JSON.parse(selectedMovie));
    } else {
      // If no movie is found in sessionStorage, fetch the latest movie
      axios.get('http://127.0.0.1:8000/api/movie')
        .then(response => {
          console.log('Movie data:', response.data);
          setMovie(response.data);
        })
        .catch(error => {
          console.error('Failed to fetch movie data:', error);
        });
    }
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

  const handleBuyNow = () => {
    if (movie) {
      navigate('/checkout', { state: { movie } }); // Navigate to checkout page with movie data
    }
  };

  return (
    <section className='movie-details'>
      {movie ? (
        <>
          <div className='movie-info'>
            <h1>{movie.title}</h1>
            <div className='movie-rating'>
              <p>{`Directed by: ${movie.director}`}</p>
              <p>{`Genre: ${movie.genre}`}</p>
              <p>{`Duration: ${movie.duration} Min`}</p>
            </div>
            <div className="movie-actions">
              <button className="watch-trailer" onClick={handleWatchTrailer}>Watch Trailer</button>
              <p>Buy Now</p>
              <ArrowRightOutlined />
              <div className="buy-now" onClick={handleBuyNow}>
                <img src={ticket} alt="Ticket" className='ticketImg' />
              </div>
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
