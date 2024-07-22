import React, { useState } from 'react';
import './AdminUpcomingMovies.css';
import { Form, Input, Button, DatePicker, Select, InputNumber, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';

const { TextArea } = Input;
const { Option } = Select;

const AdminUpcomingMovies = () => {
  const [form] = Form.useForm();
  const [previewImage, setPreviewImage] = useState(null);
  const [fileList, setFileList] = useState([]);

  const handleImagePreview = (file) => {
    console.log('File received for preview:', file);

    if (!(file instanceof Blob)) {
      console.error('Expected Blob or File but received:', file);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const onFinish = async (values) => {
    const formData = new FormData();
    formData.append('title', values.title);
    if (fileList.length > 0 && fileList[0].originFileObj) {
      formData.append('image', fileList[0].originFileObj);
    }
    formData.append('date', values.date.format('YYYY-MM-DD'));
    formData.append('duration', values.duration);
    formData.append('category', values.category);
    formData.append('description', values.description);
    formData.append('price', values.price);

    try {
      await axios.post('http://127.0.0.1:8000/api/upcoming-movies', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      message.success('Movie added successfully');
      form.resetFields();
      setPreviewImage(null);
      setFileList([]);
    } catch (error) {
      console.error('Error adding movie:', error);
      if (error.response && error.response.data && error.response.data.errors) {
        const errors = error.response.data.errors;
        for (const key in errors) {
          if (errors[key].length > 0) {
            message.error(errors[key][0]);
          }
        }
      } else {
        message.error('Failed to add movie');
      }
    }
  };

  const handleChange = ({ file, fileList }) => {
    if (file.status !== 'uploading' && file.originFileObj) {
      handleImagePreview(file.originFileObj);
    }
    setFileList(fileList);
  };

  return (
    <section className='admin-upcoming-movies'>
      <h2>Add Upcoming Movie</h2>
      <Form
        form={form}
        name="add-movie"
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item
          name="title"
          rules={[{ required: true, message: 'Please input the movie title!' }]}
        >
          <Input placeholder='Movie Title' />
        </Form.Item>
        <Form.Item
          name="image"
          rules={[{ required: true, message: 'Please upload the movie image!' }]}
          valuePropName="fileList"
          getValueFromEvent={(e) => Array.isArray(e) ? e : e && e.fileList}
        >
          <Upload
            name="image"
            listType="picture"
            beforeUpload={() => false}
            onChange={handleChange}
          >
            <Button icon={<UploadOutlined />}>Upload Movie Image</Button>
          </Upload>
          {previewImage && <img src={previewImage} alt="Preview" style={{ marginTop: 16, maxWidth: '100%' }} />}
        </Form.Item>
        <Form.Item
          name="date"
          rules={[{ required: true, message: 'Please select the release date!' }]}
        >
          <DatePicker placeholder='Select Release Date' />
        </Form.Item>
        <Form.Item
          name="duration"
          rules={[{ required: true, message: 'Please input the movie duration!' }]}
        >
          <Input placeholder='Duration (e.g., 2h 30m)' />
        </Form.Item>
        <Form.Item
          name="category"
          rules={[{ required: true, message: 'Please select the movie category!' }]}
        >
          <Select placeholder='Select Category'>
            <Option value="Action">Action</Option>
            <Option value="Drama">Drama</Option>
            <Option value="Comedy">Comedy</Option>
            <Option value="Thriller">Thriller</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="description"
          rules={[{ required: true, message: 'Please input the movie description!' }]}
        >
          <TextArea placeholder='Description' rows={4} />
        </Form.Item>
        <Form.Item
          name="price"
          rules={[{ required: true, message: 'Please input the ticket price!' }]}
        >
          <InputNumber min={0} placeholder='Ticket Price' />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add Upcoming Movie
          </Button>
        </Form.Item>
      </Form>
    </section>
  );
}

export default AdminUpcomingMovies;
