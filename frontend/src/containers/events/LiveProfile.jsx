import React from 'react';
import visalAdare from '../../assest/visalAdareTrailer.mp4';
import { Form, Input, Card } from 'antd';

const LiveEventProfile = () => {
  const [form] = Form.useForm();

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
            <video controls src={visalAdare} alt="Visal-Adare-Trailer" />
        </div>
        <div className='movie-profile-management'>
          <Form form={form} layout="vertical" onFinish={handleSubmit} className="details-form">
          <Form.Item name="title" label="Event" rules={[{ required: true, message: 'Please enter the Event title' }]}>
              <Input />
            </Form.Item>
            <Form.Item name="genre" label="Event Description" rules={[{ required: true, message: 'Please enter the Event Description' }]}>
              <Input />
            </Form.Item>
            <Form.Item name="director" label="Director" rules={[{ required: true, message: 'Please enter the movie director' }]}>
              <Input />
            </Form.Item>
            <Form.Item name="duration" label="Duration (in minutes)" rules={[{ required: true, message: 'Please enter the movie duration' }]}>
              <Input type="number" />
            </Form.Item>
            <Form.Item name="price" label="Ticket Price" rules={[{ required: true, message: 'Please enter the ticket price' }]}>
              <Input/>
            </Form.Item>
            <Form.Item name="streamLink" label="Stream Link" rules={[{ required: true, message: 'Please enter the stream link' }]}>
              <Input />
            </Form.Item>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default LiveEventProfile;
