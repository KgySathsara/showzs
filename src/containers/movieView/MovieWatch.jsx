import React, { useEffect, useState } from 'react';
import './moviewatch.css';
import ReactPlayer from 'react-player';
import axios from 'axios';
import { notification } from 'antd'; // For error or success notifications

const MovieWatch = () => {
  const [movies, setMovies] = useState([]);
  const [currentMovieLink, setCurrentMovieLink] = useState('');

  useEffect(() => {
    // Retrieve user data from sessionStorage
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);

      // Fetch movies the user has successfully paid for
      axios.post('http://127.0.0.1:8000/api/check-movie-payment', { email: user.email })
        .then(response => {
          if (response.data.status === 'success') {
            setMovies(response.data.movies);
            if (response.data.movies.length > 0) {
              setCurrentMovieLink(response.data.movies[0].link); // Set first movie link as default
            }
          } else {
            notification.error({
              message: 'Error',
              description: 'No paid movies found. Please complete a payment first.',
            });
          }
        })
        .catch(error => {
          console.error('There was an error checking the movie payment status!', error);
          notification.error({
            message: 'Payment Error',
            description: 'Error checking movie payment status. Please try again later.',
          });
        });
    } else {
      console.error('No user data found in session storage.');
      notification.error({
        message: 'Login Required',
        description: 'Please log in to access your movies.',
      });
    }
  }, []);

  const handleMovieSelect = (e) => {
    const selectedLink = e.target.value;
    setCurrentMovieLink(selectedLink);
  };

  return (
    <section className='movie-watch'>
      <h2>Watch Movie</h2>
      {movies.length > 0 ? (
        <>
          <div className='movie-select-container'>
            <select onChange={handleMovieSelect} className='movie-select'>
              {movies.map((movie, index) => (
                <option key={index} value={movie.link}>
                  {movie.title}
                </option>
              ))}
            </select>
          </div>
          <div className='movie-watch-container'>
            {currentMovieLink && (
              <div className='player-wrapper'>
                <ReactPlayer className='react-player' url={currentMovieLink} controls />
              </div>
            )}
          </div>
        </>
      ) : (
        <p>No movies available to watch. Please make sure you have completed the payment.</p>
      )}
    </section>
  );
};

export default MovieWatch;
