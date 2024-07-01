// src/components/LiveEventForm.js
import React, { useState } from 'react';
import { Form, Input, Button, DatePicker, TimePicker, Upload, Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { Option } = Select;

const LiveEventForm = ({ onSubmit }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  const handleSubmit = (values) => {
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
