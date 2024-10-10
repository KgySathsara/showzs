import React, { useEffect, useState } from 'react';
import './moviewatch.css';
import ReactPlayer from 'react-player';
import axios from 'axios';
import { notification } from 'antd'; // For error or success notifications
import { ClipLoader } from 'react-spinners'; // Loading spinner

const MovieWatch = () => {
  const [movies, setMovies] = useState([]);
  const [currentMovieLink, setCurrentMovieLink] = useState('');
  const [loading, setLoading] = useState(false); // Loading state
  const [selectedMovie, setSelectedMovie] = useState(null); // For better UI feedback

  useEffect(() => {
    setLoading(true); // Start loading

    // Retrieve user data from sessionStorage
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);

      // Fetch movies the user has successfully paid for
      axios.post('http://127.0.0.1:8000/api/check-movie-payment', { email: user.email })
        .then(response => {
          setLoading(false); // Stop loading
          if (response.data.status === 'success') {
            setMovies(response.data.movies);
            if (response.data.movies.length > 0) {
              setCurrentMovieLink(response.data.movies[0].link); // Set first movie link as default
              setSelectedMovie(response.data.movies[0].title);
            }
          } else {
            notification.error({
              message: 'Error',
              description: 'No paid movies found. Please complete a payment first.',
            });
          }
        })
        .catch(error => {
          setLoading(false); // Stop loading on error
          console.error('There was an error checking the movie payment status!', error);
          // Removed error notification here
        });
    } else {
      setLoading(false); // Stop loading
      console.error('No user data found in session storage.');
      notification.error({
        message: 'Login Required',
        description: 'Please log in to access your movies.',
      });
    }
  }, []);

  const handleMovieSelect = (e) => {
    const selectedLink = e.target.value;
    const selectedTitle = e.target.options[e.target.selectedIndex].text;
    setCurrentMovieLink(selectedLink);
    setSelectedMovie(selectedTitle);
  };

  return (
    <section className='movie-watch'>
      <h2>Watch Movie</h2>
      {loading ? (
        <div className='loading-spinner'>
          <ClipLoader color="#36d7b7" loading={loading} size={50} />
        </div>
      ) : (
        movies.length > 0 ? (
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
              {selectedMovie && <p>Now Watching: {selectedMovie}</p>}
            </div>
          </>
        ) : (
          <p>No movies available to watch. Please make sure you have completed the payment.</p>
        )
      )}
    </section>
  );
};

export default MovieWatch;
