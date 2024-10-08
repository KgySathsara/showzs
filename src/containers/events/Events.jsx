import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import './events.css';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://showz-backend.socialgear.co.uk/api/live-events/showEvent')
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

  const handleWatchNowClick = (item) => {
    setSelectedItem(item);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const closePopupAndNavigate = () => {
    // Store selected item data in localStorage
    localStorage.setItem('selectedItem', JSON.stringify(selectedItem));
    
    setIsPopupOpen(false);
    setSelectedItem(null);
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
                  <h2>{event.title}</h2>
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

      {isPopupOpen && selectedItem && (
        <div className="popup-overlay">
          <div className="popup-box">
            <Button
              icon={<CloseOutlined />}
              className="close-icon"
              onClick={closePopup}
            />
            <h2>{selectedItem.title}</h2>
            <p>Description: {selectedItem.description}</p>
            <p>Category: {selectedItem.category}</p>
            <p>Ticket Price: {selectedItem.ticketPrice}</p>
            <div className="popup-actions">
              <Button type="primary" onClick={closePopupAndNavigate} className="buy-ticket">Buy Ticket</Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Events;
