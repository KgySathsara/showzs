/* eslint-disable react/jsx-no-undef */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Movie from '../../assest/wisal.jpg';
import { Form, Input, Button, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import './LiveStreamManagement.css';

const LiveStreamManagement = () => {
  const [form] = Form.useForm();
  // eslint-disable-next-line no-unused-vars
  const [eventData, setEventData] = useState(null);
  

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/live-events/show')
      .then(response => {
        setEventData(response.data);
        form.setFieldsValue({
          title: response.data.title,
          description: response.data.description,
          date: response.data.date,
          time: response.data.time,
          ticketPrice: response.data.ticketPrice,
          category: response.data.category,
          streamLink: response.data.streamLink,
        });
      })
      .catch(error => {
        console.error('There was an error fetching the Live Event data!', error);
      });
  }, [form]);
  

  const handleSubmit = async (values) => {
    console.log('Received values:', values);
  
    const formData = new FormData();
  
    // Validate cover image type
    /*if (values.coverImage && values.coverImage.file) {
      const fileType = values.coverImage.file.type;
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'];
      if (!validTypes.includes(fileType)) {
        message.error('Invalid file type for cover image.');
        return;
      }
      formData.append('coverImage', values.coverImage.file.originFileObj);
    }
  
    // Append other form fields
    Object.keys(values).forEach((key) => {
      if (key !== 'coverImage') {
        formData.append(key, values[key]);
      }
    });*/
  
    try {
      const response = await axios.put('http://127.0.0.1:8000/api/live-events/latest', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      message.success('Event updated successfully!');
      setEventData(response.data.event);
      form.resetFields();
    } catch (error) {
      console.error('There was an error updating the event!', error);
      
      if (error.response) {
        // Log the full error response
        console.error('Error response:', error.response);
        
        if (error.response.data && error.response.data.errors) {
          // Display each validation error
          const validationErrors = error.response.data.errors;
          Object.keys(validationErrors).forEach((key) => {
            message.error(`${key}: ${validationErrors[key].join(', ')}`);
          });
        } else {
          message.error('An error occurred while updating the event.');
        }
      } else {
        message.error('Network error or server is not reachable.');
      }
    }
  };
  
  const handleDelete = () => {
    axios.delete(`http://127.0.0.1:8000/api/live-events/latest`)
      .then(() => {
        message.success('Event deleted successfully!');
        setEventData(null);
        form.resetFields();
      })
      .catch(error => {
        console.error('There was an error deleting the event!', error);
        message.error('Failed to delete event.');
      });
  };

  const handleUpload = ({ fileList }) => {
    return fileList;
  };
  
  return (
    <section className='admin-movie-management'>
      <h2>Live Stream Management</h2>
      <div className="movie-management-container">
        <div className="live-movie-card">
          <img src={Movie} alt='movie' className="centered-image" />
        </div>
        <div className='movie-management-details'>
        <h3 className="centered-heading"> Stream Management Section</h3>
        <Form form={form} layout="vertical" onFinish={handleSubmit} className="details-form">
            <Form.Item name="title" label="Event">
              <Input />
            </Form.Item>
            <Form.Item name="description" label="Event Description">
              <Input />
            </Form.Item>
            <Form.Item name="date" label="Event Date">
              <Input />
            </Form.Item>
            <Form.Item name="time" label="Event Time">
              <Input />
            </Form.Item>
            <Form.Item name="ticketPrice" label="Ticket Price">
              <Input />
            </Form.Item>
            <Form.Item name="category" label="Category">
              <Input />
            </Form.Item>
            <Form.Item name="streamLink" label="Stream Link">
              <Input />
            </Form.Item>
            <Form.Item name="coverImage" label="Cover Image" valuePropName="fileList" getValueFromEvent={handleUpload}>
              <Upload name="coverImage" listType="picture" beforeUpload={() => false}>
                <Button icon={<UploadOutlined />}>Click to upload</Button>
              </Upload>
            </Form.Item>
            <div className="form-buttons">
              <Button type="primary" className='btn-movie-management' htmlType="submit">Edit Live Event</Button>
              <Button type="primary" className='btn-movie-management' htmlType="button" onClick={handleDelete}>Delete Live Event</Button>
            </div>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default LiveStreamManagement;
