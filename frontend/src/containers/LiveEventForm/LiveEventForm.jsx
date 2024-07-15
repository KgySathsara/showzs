// src/components/LiveEventForm.js
import React, { useState } from 'react';
import { Form, Input, Button, DatePicker, TimePicker, Upload, Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { Option } = Select;

const LiveEventForm = ({ onSubmit }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  const handleSubmit = (values) => {

    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('description', values.description);
    formData.append('date', values.date.format('YYYY-MM-DD'));
    formData.append('time', values.time.format('HH:mm'));
    formData.append('ticketPrice', values.ticketPrice);
    formData.append('coverImage', fileList[0]?.originFileObj);
    formData.append('category', values.category);
    formData.append('streamLink', values.streamLink);

    axios.post('http://127.0.0.1:8000/api/live-events', formData)
      .then(response => {
        message.success('Live event created successfully');
        form.resetFields();
        setFileList([]);
      }) 
      .catch(error => {
        message.error('Failed to create live event');
        console.error(error);
      });
    onSubmit({ ...values, coverImage: fileList });
    form.resetFields();
    setFileList([]);

  };

  const handleUpload = ({ fileList }) => {
    setFileList(fileList);
  };

  return (
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
  );
};

export default LiveEventForm;
