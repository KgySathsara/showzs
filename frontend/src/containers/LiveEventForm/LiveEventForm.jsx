import React, { useState } from 'react';
import { Form, Input, Button, DatePicker, TimePicker, Upload, Select, message, Modal } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Option } = Select;

const LiveEventForm = ({ onSubmit }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [emailForm] = Form.useForm();

  const handleSubmit = async (values) => {
    setModalVisible(true);
  };

  const handleModalSubmit = async (values) => {
    try {
      const userResponse = await axios.post('http://127.0.0.1:8000/api/add-users', {
        email: values.email,
        password: values.password,
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

          const response = await axios.get('http://localhost:8000/api/s3-CoverImages', {
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
          });

          const coverUrl = signedUrl.split('?')[0];
          formData.append('coverImage', coverUrl);
        }

        await axios.post('http://127.0.0.1:8000/api/live-events', formData);
        message.success('Live event created successfully');
        form.resetFields();
        emailForm.resetFields();
        setFileList([]);
        setModalVisible(false);
        onSubmit({ ...movieValues, coverImage: fileList });
      }
    } catch (error) {
      message.error('Failed to create live event');
      console.error('Error adding user or event:', error);
    }
  };

  const handleUpload = ({ fileList }) => {
    setFileList(fileList);
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
          <Input type="number" />
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
        <Form.Item name="streamLink" label="Stream Link" rules={[{ required: true, message: 'Please enter the stream link' }]}>
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">Create Event</Button>
        </Form.Item>
      </Form>

      <Modal
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        <Form form={emailForm} layout="vertical" onFinish={handleModalSubmit}>
          <h2>Access For Content Owner</h2>
          <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Please enter your email' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="password" label="Password" rules={[{ required: true, message: 'Please enter your password' }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item name="fullName" label="Full Name">
            <Input />
          </Form.Item>
          <Form.Item name="phoneNumber" label="Phone Number">
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">Submit</Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default LiveEventForm;
