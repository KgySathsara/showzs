import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
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

  const handleDelete = () => {
    console.log(`Deleting event with ID: ${selectedEvent.id}`);
    closePopup();
  };

  return (
    <section className="live-events">
      <div className="live-events-container">
        <h1>Live Events</h1>
        <div className="event-container">
          {events.length > 0 ? (
            events.map(event => (
              <div className="event animate_animated animate_fadeInUp" key={event.id}>
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
            <Button   danger   icon={<DeleteOutlined />}   className="delete-icon"   onClick={handleDelete}/>

            <h2>{selectedEvent.title}</h2>
            <p>Name: {selectedEvent.description}</p>
            <p>Category: {selectedEvent.category}</p>
            <p>Ticket Price: {selectedEvent.ticketPrice}</p>
            <div className="popup-actions">
              <Button type="primary" onClick={closePopup} className="close-popup">Buy Ticket</Button>
            </div>
            
          </div>
        </div>
      )}
    </section>
  );
};

export default Events;
