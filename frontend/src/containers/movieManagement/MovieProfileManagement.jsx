import React from 'react';
import './movieManagement.css';
import visalAdare from '../../assest/visalAdareTrailer.mp4';
import { Form, Input, Card } from 'antd';

const MovieProfileManagement = () => {
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    console.log('Received values:', values);
    form.resetFields();
  };

  return (
    <section className='admin-movie-management'>
      <h2>Movie Profile</h2>
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
          {/* <h3>Movie</h3>
            <video controls src={visalAdare} alt="Visal-Adare-Trailer" /> */}
          <h3>Trailer</h3>
            <video controls src={visalAdare} alt="Visal-Adare-Trailer" />
        </div>
        <div className='movie-profile-management'>
          <Form form={form} layout="vertical" onFinish={handleSubmit} className="details-form">
            <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Please enter the movie title' }]}>
              <Input />
            </Form.Item>
            <Form.Item name="genre" label="Genre" rules={[{ required: true, message: 'Please enter the movie genre' }]}>
              <Input />
            </Form.Item>
            <Form.Item name="director" label="Director" rules={[{ required: true, message: 'Please enter the movie director' }]}>
              <Input />
            </Form.Item>
            <Form.Item name="duration" label="Duration (in minutes)" rules={[{ required: true, message: 'Please enter the movie duration' }]}>
              <Input type="number" />
            </Form.Item>
            <Form.Item name="price" label="Ticket Price" rules={[{ required: true, message: 'Please enter the ticket price' }]}>
              <Input />
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

export default MovieProfileManagement;
