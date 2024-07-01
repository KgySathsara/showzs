// src/pages/AdminLiveEvents/AdminLiveEvents.js
import React, { useState } from 'react';
import { Layout } from 'antd';
import { Adminnavbar } from '../../components';
import { LiveEventForm } from '../../containers';
import './AdminLiveEvents.css';

const { Content } = Layout;

const AdminLiveEvents = () => {
  const [currentEvent, setCurrentEvent] = useState(null);
  const [liveViews, setLiveViews] = useState(0);

  const handleCreateEvent = (event) => {
    setCurrentEvent({ ...event, isStreaming: false });
  };

  const handleStartStream = () => {
    setCurrentEvent((prevEvent) => ({ ...prevEvent, isStreaming: true }));
    setLiveViews((prevViews) => prevViews + 1); 
  };

  const handleStopStream = () => {
    setCurrentEvent((prevEvent) => ({ ...prevEvent, isStreaming: false }));
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Adminnavbar />
      <Layout className="site-layout">
        <Content style={{ margin: '0 16px' }}>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            <h2>Live Event Management</h2>
            {currentEvent && (
              <LiveEventForm
                event={currentEvent} 
                onStart={handleStartStream} 
                onStop={handleStopStream} 
                liveViews={liveViews}
              />
            )}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLiveEvents;
