import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Form, Input, Button, Upload, message, Select, Modal, Spin, Progress } from 'antd';
import { UploadOutlined, LoadingOutlined } from '@ant-design/icons';
import './LiveStreamManagement.css';

const { Option } = Select;

const LiveStreamManagement = () => {
  const [form] = Form.useForm();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isEventSelected, setIsEventSelected] = useState(false);
  const [events, setEvents] = useState([]);
  const [progressModalVisible, setProgressModalVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [modalAction, setModalAction] = useState('');

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/live-events')
      .then(response => {
        setEvents(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the live events!', error);
      });
  }, []);

  const fetchEvent = (eventId) => {
    axios.get(`http://127.0.0.1:8000/api/live-events/${eventId}`)
      .then(response => {
        form.setFieldsValue({
          title: response.data.title,
          description: response.data.description,
          date: response.data.date,
          time: response.data.time,
          ticketPrice: response.data.ticketPrice,
          category: response.data.category,
          streamLink: response.data.streamLink,
        });
        setSelectedEvent(response.data);
        setIsEventSelected(true);
      })
      .catch(error => {
        console.error('There was an error fetching the live event data!', error);
      });
  };

  const handleUpload = async (file, type) => {
    const formData = new FormData();
    formData.append('file_name', file.name);
    formData.append('file_type', file.type);
    formData.append('object_type', type);

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/s3-upload-url', formData);
      const { url } = response.data;

      await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': file.type,
        },
        body: file,
      });

      return url.split('?')[0];
    } catch (error) {
      console.error('Failed to upload file:', error);
      message.error('Failed to upload file');
    }
  };

  const handleSubmit = async (values) => {
    console.log('Submitting form with values:', values);
    setModalAction('updating');
    setProgressModalVisible(true);
    setProgress(0);

    try {
      const updatedValues = { ...values };

      if (values.coverImage && values.coverImage.fileList.length > 0) {
        const coverImageFile = values.coverImage.fileList[0].originFileObj;
        updatedValues.coverImage = await handleUpload(coverImageFile, 'movieCoverImages');
        setProgress((prev) => prev + 20);
      }

      const response = await axios.put(`http://127.0.0.1:8000/api/live-events/${selectedEvent.id}`, updatedValues);
      console.log('Event updated:', response.data);
      message.success('Event updated successfully');
      setIsEventSelected(false);
    } catch (error) {
      console.error('Failed to update event:', error);
      message.error('Failed to update event');
    } finally {
      setProgressModalVisible(false);
    }
  };

  const handleDelete = async () => {
    console.log('Deleting event with ID:', selectedEvent.id);
    setModalAction('deleting'); 
    setProgressModalVisible(true);
    setProgress(0);

    try {
      await axios.delete(`http://127.0.0.1:8000/api/live-events/${selectedEvent.id}`);

      if (selectedEvent.coverImage) {
        await axios.post('http://127.0.0.1:8000/api/s3-delete-object', {
          object_type: 'movieCoverImages',
          file_name: selectedEvent.coverImage,
        });
      }

      message.success('Event deleted successfully');
      setEvents(events.filter(event => event.id !== selectedEvent.id));
      setSelectedEvent(null);
      form.resetFields();
      setIsEventSelected(false);
    } catch (error) {
      console.error('Failed to delete event:', error);
      message.error('Failed to delete event');
    } finally {
      setProgressModalVisible(false);
    }
  };

  const handleEventChange = (value) => {
    console.log('Selected event:', value);
    fetchEvent(value);
  };

  return (
    <section className='admin-movie-management'>
      <h2>Live Stream Management</h2>
      <div className="select-item-container">
        <Form.Item name="category" label="Event" rules={[{ required: true, message: 'Please select an event' }]}>
          <Select onChange={handleEventChange}>
            {events.map(event => (
              <Option key={event.id} value={event.id}>{event.title}</Option>
            ))}
          </Select>
        </Form.Item>
      </div>
      <div className="movie-management-container">
        {selectedEvent && (
          <div className="live-movie-card">
            <img src={selectedEvent.coverImage} alt={selectedEvent.title} />
          </div>
        )}
        <div className='movie-management-details'>
          <h3 className="centered-heading">Stream Management Section</h3>
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
            <Form.Item name="coverImage" label="Cover Image">
              <Upload name="coverImage" listType="picture" beforeUpload={() => false}>
                <Button icon={<UploadOutlined />}>Click to upload</Button>
              </Upload>
            </Form.Item>
            <div className="form-buttons">
              <Button type="primary" className='btn-movie-management' htmlType="submit">
                {isEventSelected ? 'Update Event' : 'Submit Event'}
              </Button>
              <Button type="primary" className='btn-movie-management' htmlType="button" onClick={handleDelete}>Delete Movie</Button>
            </div>
          </Form>
        </div>
      </div>
      <Modal
        visible={progressModalVisible}
        onCancel={() => setProgressModalVisible(false)}
        footer={null}
        className="progress-modal"
        closable={false}
        maskClosable={false}
      >
        <Spin
          indicator={
            <LoadingOutlined
              style={{
                fontSize: 48,
              }}
              spin
            />
          }
        />
        <Progress percent={progress} style={{ marginTop: '20px' }} />
        <div className="progress-modal-text">
          Please wait, do not close the window
          <br />
          {modalAction === 'updating' ? 'Event is updating...' : 'Event is deleting...'}
        </div>
      </Modal>
    </section>
  );
};

export default LiveStreamManagement;
