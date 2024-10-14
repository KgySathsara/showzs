import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Form, Input, Button, Upload, message, Select, Modal, Spin, Progress } from 'antd';
import { UploadOutlined, ExclamationCircleOutlined, LoadingOutlined } from '@ant-design/icons';
import './LiveStreamManagement.css';
import moment from 'moment';

const { Option } = Select;
const { confirm } = Modal;

const LiveStreamManagement = () => {
  const [form] = Form.useForm();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isEventSelected, setIsEventSelected] = useState(false);
  const [events, setEvents] = useState([]);
  const [progressModalVisible, setProgressModalVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [modalAction, setModalAction] = useState('');
  const [imageList, setImageList] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch live events on component mount
  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/live-events');
        setEvents(response.data);
      } catch (error) {
        message.error('There was an error fetching the live events!');
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  // Fetch the selected event's data
  const fetchEvent = async (eventId) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/live-events/${eventId}`);
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
      message.error('There was an error fetching the live event data!');
    } finally {
      setLoading(false);
    }
  };

  // Handle event change in dropdown
  const handleEventChange = (eventId) => {
    fetchEvent(eventId);
  };

  // Handle file uploads
  const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append('file_name', file.name);
    formData.append('file_type', file.type);
    formData.append('object_type', 'movieCoverImages');

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/s3-upload-url', formData);
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
      message.error('Failed to upload file');
      throw error;
    }
  };

  // Handle form submission
  const handleSubmit = async (values) => {
    setModalAction('updating');
    setProgressModalVisible(true);
    setProgress(0);

    const updatedValues = { ...values, date: values.date ? moment(values.date).format('YYYY-MM-DD HH:mm:ss') : null };

    if (imageList.length > 0) {
      const coverImageFile = imageList[0].originFileObj;
      updatedValues.coverImage = await handleUpload(coverImageFile);
    }

    try {
      if (selectedEvent) {
        await axios.put(`http://127.0.0.1:8000/api/live-events/${selectedEvent.id}`, updatedValues);
        message.success('Event updated successfully');
        form.resetFields();
        setIsEventSelected(false);
      }
    } catch (error) {
      message.error('Failed to update event');
    } finally {
      setProgressModalVisible(false);
    }
  };

  // Handle delete with confirmation
  const showDeleteConfirm = () => {
    confirm({
      title: 'Are you sure you want to delete this event?',
      icon: <ExclamationCircleOutlined />,
      content: 'This action cannot be undone.',
      onOk: handleDelete,
      okText: 'Yes, delete it',
      cancelText: 'No',
    });
  };

  const handleDelete = async () => {
    setModalAction('deleting');
    setProgressModalVisible(true);
    setProgress(0);

    if (selectedEvent) {
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
        message.error('Failed to delete event');
      } finally {
        setProgressModalVisible(false);
      }
    }
  };

  // Handle file change for image upload
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
      <Spin spinning={loading}>
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
              <Form.Item name="title" label="Event Title" rules={[{ required: true, message: 'Please enter the event title' }]}>
                <Input />
              </Form.Item>
              <Form.Item name="description" label="Event Description" rules={[{ required: true, message: 'Please enter the event description' }]}>
                <Input />
              </Form.Item>
              <Form.Item name="date" label="Event Date" rules={[{ required: true, message: 'Please select the event date' }]}>
                <Input />
              </Form.Item>
              <Form.Item name="time" label="Event Time" rules={[{ required: true, message: 'Please enter the event time' }]}>
                <Input />
              </Form.Item>
              <Form.Item name="ticketPrice" label="Ticket Price" rules={[{ required: true, message: 'Please enter the ticket price' }]}>
                <Input />
              </Form.Item>
              <Form.Item name="category" label="Category" rules={[{ required: true, message: 'Please select the category' }]}>
                <Input />
              </Form.Item>
              <Form.Item name="streamLink" label="Stream Link" rules={[{ required: true, message: 'Please enter the stream link' }]}>
                <Input />
              </Form.Item>
              <Form.Item name="coverImage" label="Cover Image">
                <Upload name="coverImage" listType="picture" beforeUpload={() => false} onChange={handleFileChange} maxCount={1}>
                  <Button icon={<UploadOutlined />}>Click to upload</Button>
                </Upload>
              </Form.Item>
              <div className="form-buttons">
                <Button type="primary" className='btn-movie-management' htmlType="submit" disabled={loading}>
                  {isEventSelected ? 'Update Event' : 'Submit Event'}
                </Button>
                {isEventSelected && (
                  <Button type="primary" className='btn-delete' onClick={showDeleteConfirm}>
                    Delete Event
                  </Button>
                )}
              </div>
            </Form>
          </div>
        </div>
        <Modal
          title={modalAction === 'updating' ? 'Updating Event' : 'Deleting Event'}
          visible={progressModalVisible}
          footer={null}
          centered
        >
          <Spin
            indicator={
              <LoadingOutlined
                style={{ fontSize: 48, color: '#1890ff', marginBottom: '20px' }}
                spin
              />
            }
          />
          <h3>Uploading files... Please wait</h3>
          <Progress percent={progress} status="active" />
        </Modal>
      </Spin>
    </section>
  );
};

export default LiveStreamManagement;
