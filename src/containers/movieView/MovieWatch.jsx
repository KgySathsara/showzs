import React, { useEffect, useState } from 'react';
import './moviewatch.css';
import ReactPlayer from 'react-player';
import axios from 'axios';

const MovieWatch = () => {
  const [movies, setMovies] = useState([]);
  const [currentMovieLink, setCurrentMovieLink] = useState('');

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/movies') // Adjust the API endpoint
      .then(response => {
        console.log('API response:', response.data); // Log the response
        let responseData = response.data;
        if (!Array.isArray(responseData)) {
          responseData = [responseData];
        }
        setMovies(responseData);
        if (responseData.length > 0) {
          setCurrentMovieLink(responseData[0].streamLink); // Set the first movie link as default
        }
      })
      .catch(error => {
        console.error('There was an error fetching the movies!', error);
      });
  }, []);

  const handleMovieSelect = (e) => {
    const selectedLink = e.target.value;
    setCurrentMovieLink(selectedLink);
  };

  return (
    <section className='movie-watch'>
      <h2>Watch Movie</h2>
      <div className='movie-select-container'>
        <select onChange={handleMovieSelect} className='movie-select'>
          {movies.map((movie, index) => (
            <option key={index} value={movie.movie}>
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
    </section>
  );
}

export default MovieWatch;
