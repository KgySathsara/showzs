import React, { useEffect, useState } from 'react';
import './LiveWatchEvent.css';
import ReactPlayer from 'react-player';
import axios from 'axios';

const LiveWatchEvent = () => {
  const [liveWatchEvent, setLiveWatchEvent] = useState([]);
  const [currentEventLink, setCurrentEventLink] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8000/api/live-events/showEvent')
      .then(response => {
        console.log('API response:', response.data); // Log the response
        let responseData = response.data;
        if (!Array.isArray(responseData)) {
          responseData = [responseData];
        }
        setLiveWatchEvent(responseData);
        if (responseData.length > 0) {
          setCurrentEventLink(responseData[0].link); // Set the first event link as default
        }
      })
      .catch(error => {
        console.error('There was an error fetching the events!', error);
      });
  }, []);

  const handleEventSelect = (e) => {
    const selectedLink = e.target.value;
    setCurrentEventLink(selectedLink);
  };

  return (
    <section className='movie-watch'>
      <h2>Live Watch</h2>
      <div className='event-select-container'>
        <select onChange={handleEventSelect} className='event-select'>
          {liveWatchEvent.map((event, index) => (
            <option key={index} value={event.streamLink}>
              {event.title}
            </option>
          ))}
        </select>
      </div>
      <div className='movie-watch-container'>
        {currentEventLink && (
          <div className='player-wrapper'>
            <ReactPlayer className='react-player' url={currentEventLink} controls />
          </div>
        )}
      </div>
    </section>
  );
}

export default LiveWatchEvent;
