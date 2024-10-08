import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Form, Input, Button, Upload, message, Select, Modal, Spin, Progress } from 'antd';
import { UploadOutlined, LoadingOutlined } from '@ant-design/icons';
import './LiveStreamManagement.css';
import moment from 'moment';

const { Option } = Select;

const LiveStreamManagement = () => {
  const [form] = Form.useForm();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isEventSelected, setIsEventSelected] = useState(false);
  const [events, setEvents] = useState([]);
  const [progressModalVisible, setProgressModalVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [modalAction, setModalAction] = useState('');
  const [imageList, setImageList] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://showz-backend.socialgear.co.uk/api/live-events');
        setEvents(response.data);
      } catch (error) {
        console.error('There was an error fetching the live events!', error);
      }
    };
    fetchEvents();
  }, []);

  const fetchEvent = async (eventId) => {
    try {
      const response = await axios.get(`http://showz-backend.socialgear.co.uk/api/live-events/${eventId}`);
      const formData = {
        title: response.data.title,
        description: response.data.description,
        date: moment(response.data.date),
        time: response.data.time,
        ticketPrice: response.data.ticketPrice,
        category: response.data.category,
        streamLink: response.data.streamLink,
      };
      setSelectedEvent(response.data);
      form.setFieldsValue(formData);
      setIsEventSelected(true);
    } catch (error) {
      console.error('There was an error fetching the live event data!', error);
    }
  };

  const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append('file_name', file.name);
    formData.append('file_type', file.type);
    formData.append('object_type', 'movieCoverImages');

    try {
      const response = await axios.post('http://showz-backend.socialgear.co.uk/api/s3-upload-url', formData);
      const { url } = response.data;

      await axios.put(url, file, {
        headers: {
          'Content-Type': file.type,
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setProgress(percentCompleted);
        }
      });

      return url.split('?')[0];
    } catch (error) {
      console.error('Failed to upload file:', error);
      message.error('Failed to upload file');
      throw error;
    }
  };

  const handleSubmit = async (values) => {
    setModalAction('updating');
    setProgressModalVisible(true);
    setProgress(0);

    if (selectedEvent) {
      try {
        const updatedValues = { ...values, date: values.date ? moment(values.date).format('YYYY-MM-DD HH:mm:ss') : null };

        if (imageList.length > 0) {
          const coverImageFile = imageList[0].originFileObj;

          if (!coverImageFile.type.startsWith('image/')) {
            message.error('Please upload only image files.');
            return;
          }
          updatedValues.coverImage = await handleUpload(coverImageFile);
        }

        await axios.put(`http://showz-backend.socialgear.co.uk/api/live-events/${selectedEvent.id}`, updatedValues, {
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setProgress(percentCompleted);
          }
        });

        message.success('Event updated successfully');
        setIsEventSelected(false);
        setProgressModalVisible(false);
      } catch (error) {
        console.error('Failed to update event:', error);
        message.error('Failed to update event');
        setProgressModalVisible(false);
      }
    }
  };

  const handleDelete = async () => {
    setModalAction('deleting');
    setProgressModalVisible(true);
    setProgress(0);

    if (selectedEvent) {
      try {
        await axios.delete(`http://showz-backend.socialgear.co.uk/api/live-events/${selectedEvent.id}`, {
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setProgress(percentCompleted);
          }
        });

        if (selectedEvent.coverImage) {
          await axios.post('http://showz-backend.socialgear.co.uk/api/s3-delete-object', {
            object_type: 'movieCoverImages',
            file_name: selectedEvent.coverImage,
          });
        }

        message.success('Event deleted successfully');
        setEvents(events.filter(event => event.id !== selectedEvent.id));
        setSelectedEvent(null);
        form.resetFields();
        setIsEventSelected(false);
        setProgressModalVisible(false);
      } catch (error) {
        console.error('Failed to delete event:', error);
        message.error('Failed to delete event');
        setProgressModalVisible(false);
      }
    }
  };

  const handleEventChange = (value) => {
    fetchEvent(value);
  };

  const handleFileChange = ({ fileList }) => {
    const isValidFile = fileList.every(file => file.type.startsWith('image/'));
    if (isValidFile) {
      setImageList(fileList);
    } else {
      message.error('Please upload only JPEG or PNG image files.');
      setImageList([]);
    }
  };

  return (
    <section className='admin-movie-management'>
      <h2>Live Stream Management</h2>
      <div className="select-item-container">
        <Form.Item name="event" label="Event" rules={[{ required: true, message: 'Please select an event' }]}>
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
              <Upload name="coverImage" listType="picture" beforeUpload={() => false} onChange={handleFileChange} maxCount={1}>
                <Button icon={<UploadOutlined />}>Click to upload</Button>
              </Upload>
            </Form.Item>
            <div className="form-buttons">
              <Button type="primary" className='btn-movie-management' htmlType="submit">
                {isEventSelected ? 'Update Event' : 'Submit Event'}
              </Button>
              <Button type="primary" className='btn-movie-management' htmlType="button" onClick={handleDelete}>Delete Event</Button>
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
