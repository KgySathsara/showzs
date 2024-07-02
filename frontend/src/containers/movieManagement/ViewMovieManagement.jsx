import React from 'react';
import './movieManagement.css';
import Movie from '../../assest/wisal.jpg'
import { Form, Input, Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const ViewMovieManagement = () => {

  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    console.log('Received values:', values);
    form.resetFields();
  };

  const handleUpload = ({ fileList }) => {
    return fileList;
  };

  return (
    <section className='admin-movie-management'>
      <h2>View Movie</h2>
      <div className="movie-management-container">
        <div className="movie-card">
          <img src={Movie} alt='movie' />
        </div>
        <div className='movie-management-details'>
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
            <Form.Item name="price" label="Ticket Price" rules={[{ required: true, message: 'Please enter the ticket price' }]} >
              <Input/>
            </Form.Item>
            <Form.Item name="streamLink" label="Stream Link" rules={[{ required: true, message: 'Please enter the stream link' }]}>
              <Input />
            </Form.Item>
            <Form.Item name="picture" className='upload-image' label="Picture" valuePropName="fileList" getValueFromEvent={handleUpload} >
              <Upload name="picture" listType="picture" beforeUpload={() => false}>
                <Button icon={<UploadOutlined />}>Click to upload</Button>
              </Upload>
            </Form.Item>
            <div className="form-buttons">
              <Button type="primary" className='btn-movie-management' htmlType="submit">Edit Movie</Button>
              <Button type="primary" className='btn-movie-management' htmlType="button">Delete Movie</Button>
            </div>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default ViewMovieManagement;
