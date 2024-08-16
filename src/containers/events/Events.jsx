import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import './events.css';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8000/api/live-events/showEvent')
      .then(response => {
        console.log('API response:', response.data); 
        let responseData = response.data;
        if (!Array.isArray(responseData)) {
          responseData = [responseData];
        }

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

  const closePopupAndNavigate = () => {
    // Store selected event data in localStorage
    localStorage.setItem('selectedEvent', JSON.stringify(selectedEvent));
    
    setIsPopupOpen(false);
    setSelectedEvent(null);
    navigate('/Checkout');
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
            <Button
              icon={<CloseOutlined />}
              className="close-icon"
              onClick={closePopup}
            />
            <h2>{selectedEvent.title}</h2>
            <p>Description: {selectedEvent.description}</p>
            <p>Category: {selectedEvent.category}</p>
            <p>Ticket Price: {selectedEvent.ticketPrice}</p>
            <div className="popup-actions">
              <Button type="primary" onClick={closePopupAndNavigate} className="buy-ticket">Buy Ticket</Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Events
