import React, { useState } from 'react';
import event1 from '../../assest/youth.jpg'; 
import event2 from '../../assest/youth.jpg'; 
import event3 from '../../assest/youth.jpg'; 
import './events.css';

const Events = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

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
          <div className="event">
            <img src={event1} alt="Event 1" />
            <button className="watch-now" onClick={() => handleWatchNowClick('Event 1')}>Watch Now</button>
          </div>
          <div className="event">
            <img src={event2} alt="Event 2" />
            <button className="watch-now" onClick={() => handleWatchNowClick('Event 2')}>Watch Now</button>
          </div>
          <div className="event">
            <img src={event3} alt="Event 3" />
            <button className="watch-now" onClick={() => handleWatchNowClick('Event 3')}>Watch Now</button>
          </div>
        </div>
      </div>

      {isPopupOpen && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h2>{selectedEvent}</h2>
            <p>Details about {selectedEvent}...</p>
            <button onClick={closePopup} className="close-popup">Close</button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Events;
