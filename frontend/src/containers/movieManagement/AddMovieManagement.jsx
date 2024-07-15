import React from 'react';
import { Form, Input, Button, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import './movieManagement.css';

const AddMovieManagement = () => {
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('genre', values.genre);
    formData.append('director', values.director);
    formData.append('duration', values.duration);
    formData.append('price', values.price);
    formData.append('stream_link', values.streamLink);
    formData.append('picture', values.picture[0].originFileObj); 
    formData.append('trailer', values.trailer[0].originFileObj); 

    try {
      await axios.post('http://127.0.0.1:8000/api/movies', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      message.success('Movie added successfully');
      form.resetFields();
    } catch (error) {
      console.error('Error adding movie:', error);
      message.error('Failed to add movie');
    }
  };

  const handleUpload = ({ fileList }) => fileList;

  return (
    <div className="admin-movie-container">
      <h2>Add New Movie</h2>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
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
        <Form.Item name="picture" label="Picture" valuePropName="fileList" getValueFromEvent={handleUpload} rules={[{ required: true, message: 'Please upload a picture' }]}>
          <Upload name="picture" listType="picture" beforeUpload={() => false}>
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
        </Form.Item>

        <Form.Item name="trailer" label="Trailer" valuePropName="fileList" getValueFromEvent={handleUpload} rules={[{ required: true, message: 'Please upload the movie trailer' }]}>
          <Upload name="trailer" listType="picture" beforeUpload={() => false}>
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">Add Movie</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddMovieManagement;