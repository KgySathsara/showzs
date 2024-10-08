import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './stream.css';

const Stream = () => {
  const [movies, setMovies] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTrailer, setSelectedTrailer] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://showz-backend.socialgear.co.uk/api/movies/latest')
      .then(response => {
        console.log('API response:', response.data);
        let responseData = response.data;
        if (!Array.isArray(responseData)) {
          responseData = [responseData];
        }
  
        const sortedMovies = responseData.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 2);
  
        console.log('Sorted Movies:', sortedMovies);
        setMovies(sortedMovies);
      })
      .catch(error => {
        console.error('There was an error fetching the movies!', error);
      });
  }, []);

  const handleWatchTrailer = (trailerUrl) => {
    if (trailerUrl) {
      setSelectedTrailer(trailerUrl);
      setShowModal(true);
    } else {
      console.error('No valid trailer URL found:', trailerUrl);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedTrailer('');
  };

  const handleBuyTickets = (item) => {
      localStorage.setItem('selectedItem', JSON.stringify(item));
      sessionStorage.setItem('selectedItem', JSON.stringify(item));
    navigate('/Movies');
  };

  return (
    <section className='stream'>
      <div className='stream-container'>
        <hr />
        <h1>Now Streaming</h1>
        {movies.length > 0 ? (
          <div className={`movie-container ${movies.length === 1 ? 'single-movie' : ''}`}>
            {movies.map((movie) => (
              <div className="movie" key={movie.id}>
                {movie.picture && (
                  <img src={movie.picture} alt={movie.title} />
                )}
                <h2>{movie.title}</h2>
                <p>Duration : {movie.duration} min</p>
                <p>Price : {movie.price}</p>
                <div className="buttons">
                  <button className="watch-trailer" onClick={() => handleWatchTrailer(movie.trailer)}>Watch Trailer</button>
                  <button className="buy-tickets" onClick={() => handleBuyTickets(movie)}>Buy Tickets</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No movies available at the moment.</p>
        )}
        <hr />
      </div>

      {showModal && selectedTrailer && (
        <div className="modal-overlay">
          <div className="modal-content">
            <span className="close-button" onClick={handleCloseModal}>&times;</span>
            <video controls src={selectedTrailer} className="trailer-video" />
          </div>
        </div>
      )}
    </section>
  );
};

export default Stream;
