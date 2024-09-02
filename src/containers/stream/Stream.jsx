import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './stream.css';
import { Button } from 'antd';
import { FaTimes } from 'react-icons/fa';

const Stream = () => {
  const [movies, setMovies] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTrailer, setSelectedTrailer] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8000/api/movies/latest')
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
    setSelectedItem(item);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedItem(null);
  };

  const closePopupAndNavigate = () => {
    setIsPopupOpen(false);
    if (selectedItem) {
      localStorage.setItem('selectedItem', JSON.stringify(selectedItem));
    }
    setSelectedItem(null);
    navigate('/Checkout');
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
                <p>{movie.duration} min</p>
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

      {isPopupOpen && selectedItem && (
        <div className="popup-overlay">
          <div className="popup-box">
            <button onClick={closePopup} className="close-icon">
              <FaTimes />
            </button>
            <h2>{selectedItem.title}</h2>
            <p>Duration: {selectedItem.duration} min</p>
            <p>Category: {selectedItem.genre}</p>
            <p>Ticket Price: {selectedItem.price}</p>
            <div className="popup-actions">
              <Button type="primary" onClick={closePopupAndNavigate} className="close-popup">Buy Ticket</Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Stream;
