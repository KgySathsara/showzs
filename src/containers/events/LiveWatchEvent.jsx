import React, { useEffect, useState } from 'react';
import './LiveWatchEvent.css';
import ReactPlayer from 'react-player';
import axios from 'axios';
import { notification } from 'antd'; // For error or success notifications

const LiveWatchEvent = () => {
  const [liveEvents, setLiveEvents] = useState([]);
  const [currentEventLink, setCurrentEventLink] = useState('');

  useEffect(() => {
    // Retrieve user data from sessionStorage
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);

      // Fetch live events the user has access to
      axios.post('http://127.0.0.1:8000/api/check-event-payment', { email: user.email })
        .then(response => {
          console.log('API response:', response.data); // Log the response
          if (response.data.status === 'success') {
            const responseData = response.data.events;
            setLiveEvents(responseData);
            if (responseData.length > 0) {
              setCurrentEventLink(responseData[0].streamLink); // Set the first event as default
            }
          } else {
            notification.error({
              message: 'Access Error',
              description: 'No live events available for your account. Please check your access.',
            });
          }
        })
        .catch(error => {
          console.error('Error fetching live events:', error);
          notification.error({
            message: 'Fetch Error',
            description: 'Error fetching live events. Please try again later.',
          });
        });
    } else {
      console.error('No user data found in session storage.');
      notification.error({
        message: 'Login Required',
        description: 'Please log in to access live events.',
      });
    }
  }, []);

  const handleEventSelect = (e) => {
    const selectedLink = e.target.value;
    setCurrentEventLink(selectedLink);
  };

  return (
    <section className='live-watch'>
      <h2>Live Event Watch</h2>
      {liveEvents.length > 0 ? (
        <>
          <div className='event-select-container'>
            <select onChange={handleEventSelect} className='event-select'>
              {liveEvents.map((event, index) => (
                <option key={index} value={event.streamLink}>
                  {event.title}
                </option>
              ))}
            </select>
          </div>
          <div className='live-watch-container'>
            {currentEventLink && (
              <div className='player-wrapper'>
                <ReactPlayer className='react-player' url={currentEventLink} controls />
              </div>
            )}
          </div>
        </>
      ) : (
        <p>No live events available. Please make sure you have completed the payment.</p>
      )}
    </section>
  );
};

export default LiveWatchEvent;
