import React, { useState } from 'react';
import Movie from '../../assest/wisal.jpg';
import { Form, Input, Button, Upload } from 'antd';
import { UploadOutlined, PlayCircleOutlined, StopOutlined } from '@ant-design/icons';
import './LiveStreamManagement.css';

const LiveStreamManagement = () => {
  const [form] = Form.useForm();
  const [isPlaying, setIsPlaying] = useState(false);

  const handleSubmit = (values) => {
    console.log('Received values:', values);
    form.resetFields();
  };

  const handleUpload = ({ fileList }) => {
    return fileList;
  };

  const handlePlayStop = () => {
    setIsPlaying((prev) => !prev);
    if (isPlaying) {
      console.log('Stopping the stream');
    } else {
      console.log('Playing the stream');
    }
  };

  return (
    <section className='admin-movie-management'>
      <h2>Live Stream Management</h2>
      <div className="movie-management-container">
        <div className="movie-card">
          <img src={Movie} alt='movie' className="centered-image" />
          <div className="stream-controls">
            <Button
              type="primary"
              shape="circle"
              icon={isPlaying ? <StopOutlined /> : <PlayCircleOutlined />}
              onClick={handlePlayStop}
              className="circular-button"
            />
          </div>
        </div>
        <div className='movie-management-details'>
        <h3 className="centered-heading"> Stream Management Section</h3>
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
            <Form.Item name="picture" className='upload-image' label="Picture" valuePropName="fileList" getValueFromEvent={handleUpload}>
              <Upload name="picture" listType="picture" beforeUpload={() => false}>
                <Button icon={<UploadOutlined />}>Click to upload</Button>
              </Upload>
            </Form.Item>
            <div className="form-buttons">
              <Button type="primary" className='btn-movie-management' htmlType="submit">Edit Live Event</Button>
              <Button type="primary" className='btn-movie-management' htmlType="button">Delete Live Event</Button>
            </div>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default LiveStreamManagement;
