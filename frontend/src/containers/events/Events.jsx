import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './events.css';

const Events = () => {
  const [events, setEvents] = useState([]);

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

  return (
    <section className="live-events">
      <div className="live-events-container">
        <h1>Live Events</h1>
        <div className="event-container">
          {events.length > 0 ? (
            events.map(event => (
              <div className="event animate__animated animate__fadeInUp" key={event.id}>
                <img src={`http://localhost:8000/images/${event.coverImage}`} alt={event.title} />
                <div className="movie-info">
                  <h3>{event.title}</h3>
                  <p>{event.description}</p>
                  <p>Category: {event.category}</p>
                  <p>Ticket Price: {event.ticketPrice}</p>
                </div>
                <button className="watch-now">Watch Now</button>
              </div>
            ))
          ) : (
            <p>No events available.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Events;
