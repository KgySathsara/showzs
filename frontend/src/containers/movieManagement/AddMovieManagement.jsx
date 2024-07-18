import React, { useState } from 'react';
import { Form, Input, Button, Upload, message, Modal } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import './movieManagement.css';

const AddMovieManagement = () => {
  const [form] = Form.useForm();
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
          const userId = userResponse.data.id;
          const formData = new FormData();
          const movieValues = form.getFieldsValue();

          formData.append('title', movieValues.title);
          formData.append('genre', movieValues.genre);
          formData.append('director', movieValues.director);
          formData.append('duration', movieValues.duration);
          formData.append('price', movieValues.price);
          formData.append('stream_link', movieValues.streamLink);
          formData.append('picture', movieValues.picture[0].originFileObj);
          formData.append('trailer', movieValues.trailer[0].originFileObj);
          formData.append('user_id', userId);

          await axios.post('http://127.0.0.1:8000/api/movies', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });

          message.success('Movie added successfully');
          form.resetFields();
          emailForm.resetFields();
          setModalVisible(false);
        }

        message.success('User added successfully');
        form.resetFields();
        emailForm.resetFields();
        setModalVisible(false);

      } catch (error) {
        console.error('Error adding movie or user:', error);
        message.error('Failed to add movie or user');
      }
    };

    const handleUpload = ({ fileList }) => fileList;

    return (
      <div className="admin-movie-container">
        <h2>Add New Movie</h2>
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
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
          <Form.Item name="price" label="Ticket Price" rules={[{ required: true, message: 'Please enter the ticket price' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="streamLink" label="Stream Link" rules={[{ required: true, message: 'Please enter the stream link' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="picture" label="Picture" valuePropName="fileList" getValueFromEvent={handleUpload} rules={[{ required: true, message: 'Please upload a picture' }]}>
            <Upload name="picture" listType="picture" beforeUpload={() => false}>
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item name="trailer" label="Trailer" valuePropName="fileList" getValueFromEvent={handleUpload} rules={[{ required: true, message: 'Please upload the movie trailer' }]}>
            <Upload name="trailer" listType="picture" beforeUpload={() => false}>
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">Add Movie</Button>
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
      </div>
    );
  };

export default AddMovieManagement;
