import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './events.css';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/api/live-events/showEvent')
      .then(response => {
        console.log('API response:', response.data); // Log the response
        let responseData = response.data;
        if (!Array.isArray(responseData)) {
          responseData = [responseData];
        }
        
        // Sort by date descending and take the first 3 events
        const sortedEvents = responseData.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3);
        
        setEvents(sortedEvents);
      })
      .catch(error => {
        console.error('There was an error fetching the events!', error);
      });
  }, []);

  const handleWatchNowClick = (event) => {
    setSelectedEvent(event);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <section className="live-events">
      <div className="live-events-container">
        <h1>Live Events</h1>
        <div className="event-container">
          {events.length > 0 ? (
            events.map(event => (
              <div className="event animate__animated animate__fadeInUp" key={event.id}>
                <img src={event.coverImage} alt={event.title} />
                <div className="movie-info">
                  <h3>{event.title}</h3>
                  <p>{event.description}</p>
                  <p>Category: {event.category}</p>
                  <p>Ticket Price: {event.ticketPrice}</p>
                </div>
                <button 
                  className="watch-now" 
                  onClick={() => handleWatchNowClick(event)}>
                  Watch Now
                </button>
              </div>
            ))
          ) : (
            <p>No events available.</p>
          )}
        </div>
      </div>

      {isPopupOpen && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h2>{selectedEvent.title}</h2>
            <p>Name : {selectedEvent.description}</p>
            <p>Category: {selectedEvent.category}</p>
            <p>Ticket Price: {selectedEvent.ticketPrice}</p>
            <button onClick={closePopup} className="close-popup">Buy Ticket</button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Events;
