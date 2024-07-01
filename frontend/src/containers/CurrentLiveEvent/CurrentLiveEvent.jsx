// src/components/CurrentLiveEvent.js
import React from 'react';
import { Card, Button, Input } from 'antd';
import './CurrentLiveEvent.css';  

const CurrentLiveEvent = ({ event, onStart, onStop, liveViews }) => {
  if (!event) {
    return <p>No live event is currently streaming.</p>;
  }

  const coverImageUrl = event.coverImage && event.coverImage[0] && URL.createObjectURL(event.coverImage[0].originFileObj);
  const streamLink = "https://streamingplatform.com/live/" + event.title.replace(/\s+/g, '-').toLowerCase();

  return (
    <Card title={event.title} bordered={false} cover={coverImageUrl ? (
      <div className="cover-image-wrapper">
        <img alt="cover" src={coverImageUrl} className="cover-image" />
      </div>
    ) : null}>
      <p>{event.description}</p>
      <p>{`Date: ${event.date.format('YYYY-MM-DD')}`}</p>
      <p>{`Time: ${event.time.format('HH:mm')}`}</p>
      <p>{`Ticket Price: $${event.ticketPrice}`}</p>
      <p>{`Category: ${event.category}`}</p>
      <p>{`Live Views: ${liveViews}`}</p>
      <div>
        <Input value={streamLink} readOnly addonBefore="Stream Link" />
      </div>
      <div style={{ marginTop: '16px' }}>
        {event.isStreaming ? (
          <Button type="danger" onClick={onStop}>Stop Stream</Button>
        ) : (
          <Button type="primary" onClick={onStart}>Start Stream</Button>
        )}
      </div>
    </Card>
  );
};

export default CurrentLiveEvent;
