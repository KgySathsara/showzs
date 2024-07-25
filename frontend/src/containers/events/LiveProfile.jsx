/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Form, Input, Card } from 'antd';

const LiveEventProfile = () => {
  const [form] = Form.useForm();
  const [eventData, setEventData] = useState(null);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/live-events/show')
      .then(response => {
        setEventData(response.data);
        form.setFieldsValue(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the Live Event data!', error);
      });
  }, [form]);

  const handleSubmit = (values) => {
    console.log('Received values:', values);
    form.resetFields();
  };

  return (
    <section className='admin-movie-management'>
      <h2>Live Event Profile</h2>
      <div className='movie-profile-card'>
        <Card title="Monthly Revenue" className='profile-card'>
          <p>Monthly Revenue Content</p>
        </Card>
        <Card title="Profile Views" className='profile-card'>
          <p>Profile Views Content</p>
        </Card>
      </div>
      <div className="movie-management-container">
        <div className="video-container">
          <h3>Live Event</h3>
          {eventData && (
            <img src={`http://localhost:8000/images/${eventData.coverImage}`} alt={eventData.title} />
          )}
        </div>
        <div className='movie-profile-management'>
          <Form form={form} layout="vertical" onFinish={handleSubmit} className="details-form">
            <Form.Item name="title" label="Event" rules={[{ required: true, message: 'Please enter the Event title' }]}>
              <Input readOnly />
            </Form.Item>
            <Form.Item name="description" label="Event Description" rules={[{ required: true, message: 'Please enter the Event Description' }]}>
              <Input readOnly />
            </Form.Item>
            <Form.Item name="date" label="Event Date" rules={[{ required: true, message: 'Please enter the Date' }]}>
              <Input readOnly />
            </Form.Item>
            <Form.Item name="time" label="Event Time" rules={[{ required: true, message: 'Please select the event time' }]}>
              <Input readOnly />
            </Form.Item>
            <Form.Item name="ticketPrice" label="Ticket Price" rules={[{ required: true, message: 'Please enter the ticket price' }]}>
              <Input readOnly />
            </Form.Item>
            <Form.Item name="category" label="Category" rules={[{ required: true, message: 'Please enter the Category' }]}>
              <Input readOnly />
            </Form.Item>
            <Form.Item name="streamLink" label="Stream Link" rules={[{ required: true, message: 'Please enter the stream link' }]}>
              <Input readOnly />
            </Form.Item>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default LiveEventProfile;
