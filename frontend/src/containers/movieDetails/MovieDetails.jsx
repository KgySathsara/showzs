import React from 'react';
import movie1 from '../../assest/wisal.jpg';
import ticket from '../../assest/ticket.jpg';
import './movieDetails.css';

const MovieDetails = () => {
  return (
    <section className='movie-details'>
      <div className='movie-info'>
        <h1>Visal Adare</h1>
        <p>2024, Love . 3hr 30min</p>
        <p>Visal Adare is a Sinhala movie starring Dinakshie Priyasad and Nimesh Weeranga in prominent roles. It is directed by Wasawa Baduge.</p>
        <div className="movie-actions">
          <img src={ticket} alt="Ticket" className='ticketImg' />
          <button className="watch-trailer">Watch Trailer</button>
        </div>
      </div>
      <div className='movie-poster'>
        <div className="poster-container">
          <img src={movie1} alt="Visal Adare" />
          <div className="movie-details-overlay">
            <h2>Visal Adare - The Movie</h2>
            <p>Directed by Wasawa Baduge</p>
            <p>Starring Dinakshie Priyasad and Nimesh Weeranga</p>
            <p>Release Date: 2024</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MovieDetails;
