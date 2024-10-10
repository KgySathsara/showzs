import React, { useState } from 'react';
import { Form, Input, Button, DatePicker, TimePicker, Upload, Select, message, Modal, Spin, Progress } from 'antd';
import { UploadOutlined, LoadingOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Option } = Select;

const LiveEventForm = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [progressModalVisible, setProgressModalVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailForm] = Form.useForm();

  const handleSubmit = async (values) => {
    if (fileList.length === 0) {
      message.error('Please upload a cover image for the event.');
      return;
    }
    setModalVisible(true);
  };

  const handleModalSubmit = async (values) => {
    setIsSubmitting(true);
    try {
      const userResponse = await axios.post('http://127.0.0.1:8000/api/add-users', {
        email: values.email,
        password: values.password,
        password_confirmation: values.password_confirmation,
        full_name: values.fullName,
        phone_number: values.phoneNumber,
        user_type: 4,
      });

      if (userResponse.status === 201) {
        const movieValues = form.getFieldsValue();
        const formData = new FormData();
        formData.append('title', movieValues.title);
        formData.append('description', movieValues.description);
        formData.append('date', movieValues.date.format('YYYY-MM-DD'));
        formData.append('time', movieValues.time.format('HH:mm'));
        formData.append('ticketPrice', movieValues.ticketPrice);
        formData.append('category', movieValues.category);
        formData.append('streamLink', movieValues.streamLink);

        if (fileList.length > 0) {
          const coverFile = fileList[0].originFileObj;

          if (!coverFile.type.startsWith('image/')) {
            message.error('Please upload only image files.');
            return;
          }

          try {
            setProgressModalVisible(true);
            setProgress(0);

            const response = await axios.get('http://127.0.0.1:8000/api/s3-CoverImages', {
              params: {
                file_name: coverFile.name,
                file_type: coverFile.type,
              },
            });

            const signedUrl = response.data.url;

            await axios.put(signedUrl, coverFile, {
              headers: {
                'Content-Type': coverFile.type,
              },
              onUploadProgress: (progressEvent) => {
                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                setProgress(percentCompleted);
              },
            });

            const coverUrl = signedUrl.split('?')[0];
            formData.append('coverImage', coverUrl);

            await axios.post('http://127.0.0.1:8000/api/live-events', formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
              onUploadProgress: (progressEvent) => {
                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                setProgress(percentCompleted);
              },
            });

            message.success('Live event created successfully');
            form.resetFields();
            emailForm.resetFields();
            setFileList([]);
            setModalVisible(false);
            setProgressModalVisible(false);
          } catch (error) {
            message.error('Failed to create live event');
            console.error('Error adding user or event:', error);
            setProgressModalVisible(false);
          }
        } else {
          message.error('Please upload an image.');
        }
      }
    } catch (error) {
      console.error('Error adding movie or user:', error);
      message.error('Failed to add user or movie. Please check the credentials and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpload = ({ fileList }) => {
    const isImage = fileList.every(file => file.type.startsWith('image/'));
    if (isImage) {
      setFileList(fileList);
    } else {
      message.error('You can only upload image files!');
      setFileList([]);
    }
  };

  return (
    <>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item name="title" label="Event Title" rules={[{ required: true, message: 'Please enter the event title' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Event Description" rules={[{ required: true, message: 'Please enter the event description' }]}>
          <Input.TextArea />
        </Form.Item>
        <Form.Item name="date" label="Event Date" rules={[{ required: true, message: 'Please select the event date' }]}>
          <DatePicker />
        </Form.Item>
        <Form.Item name="time" label="Event Time" rules={[{ required: true, message: 'Please select the event time' }]}>
          <TimePicker />
        </Form.Item>
        <Form.Item name="ticketPrice" label="Ticket Price" rules={[{ required: true, message: 'Please enter the ticket price' }]}>
          <Input type="number" min={0} step={0.01} />
        </Form.Item>
        <Form.Item name="coverImage" label="Cover Image" valuePropName="fileList" getValueFromEvent={(e) => e.fileList}>
          <Upload name="logo" listType="picture" beforeUpload={() => false} onChange={handleUpload}>
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
        </Form.Item>
        <Form.Item name="category" label="Event Category" rules={[{ required: true, message: 'Please select an event category' }]}>
          <Select>
            <Option value="Music">Music</Option>
            <Option value="Sports">Sports</Option>
            <Option value="Technology">Technology</Option>
            <Option value="Education">Education</Option>
          </Select>
        </Form.Item>
        <Form.Item name="streamLink" label="Stream Link" rules={[{ required: true, message: 'Please enter the stream link' }, { type: 'url', message: 'Please enter a valid URL' }]}>
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" disabled={isSubmitting}>
            {isSubmitting ? <Spin indicator={<LoadingOutlined />} /> : 'Create Event'}
          </Button>
        </Form.Item>
      </Form>

      <Modal
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        <Form form={emailForm} layout="vertical" onFinish={handleModalSubmit}>
          <h2>Access For Content Owner</h2>
          <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Please enter your email' }, { type: 'email', message: 'Please enter a valid email address' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="password" label="Password" rules={[{ required: true, message: 'Please enter your password' }, { min: 8, message: 'Password must be at least 8 characters long' }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item name="password_confirmation" label="Confirm Password" rules={[{ required: true, message: 'Please confirm your password' }, ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject('Passwords do not match!');
              },
            }),
          ]}>
            <Input.Password />
          </Form.Item>
          <Form.Item name="fullName" label="Full Name" rules={[{ required: true, message: 'Please enter your full name' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="phoneNumber" label="Phone Number" rules={[{ required: true, message: 'Please enter your phone number' }]}>
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" disabled={isSubmitting}>
              {isSubmitting ? <Spin indicator={<LoadingOutlined />} /> : 'Submit'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>

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
              style={{ fontSize: 48, color: '#1890ff', marginBottom: '20px' }}
              spin
            />
          }
        />
        <h3>Uploading files... Please wait</h3>
        <Progress percent={progress} />
      </Modal>
    </>
  );
};

export default LiveEventForm;
