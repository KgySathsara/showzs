import React, { useState } from 'react';
import { Form, Input, Button, Upload, message, Modal, Progress, Spin } from 'antd';
import { UploadOutlined, LoadingOutlined } from '@ant-design/icons';
import axios from 'axios';
import './movieManagement.css';

const AddMovieManagement = ({ onSubmit }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [trailerList, setTrailerList] = useState([]);
  const [movieList, setMovieList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [progressModalVisible, setProgressModalVisible] = useState(false);
  const [emailForm] = Form.useForm();
  const [progress, setProgress] = useState(0);

  const handleSubmit = async (values) => {
    if (fileList.length === 0) {
      message.error('Please upload a cover image for the event.');
      return;
    }
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
        formData.append('genre', movieValues.genre);
        formData.append('director', movieValues.director);
        formData.append('duration', movieValues.duration);
        formData.append('price', movieValues.price);
        formData.append('stream_link', movieValues.streamLink);

        if (fileList.length > 0) {
          const coverImage = fileList[0].originFileObj;

          if (!coverImage.type.startsWith('image/')) {
            message.error('Please upload only image files.');
            return;
          }

          try {
            setProgressModalVisible(true);
            setProgress(0);

            const coverImageResponse = await axios.get('http://127.0.0.1:8000/api/s3-CoverImages', {
              params: {
                file_name: coverImage.name,
                file_type: coverImage.type,
              },
            });

            const signedUrl = coverImageResponse.data.url;

            await axios.put(signedUrl, coverImage, {
              headers: {
                'Content-Type': coverImage.type,
              },
              onUploadProgress: (progressEvent) => {
                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                setProgress(percentCompleted);
              },
            });

            const coverImageUrl = signedUrl.split('?')[0];
            formData.append('picture', coverImageUrl);
          } catch (error) {
            message.error('Failed to upload cover image.');
            setProgressModalVisible(false);
            return;
          }
        }

        if (trailerList.length > 0) {
          const trailer = trailerList[0].originFileObj;

          if (!trailer.type.startsWith('video/')) {
            message.error('Please upload only video files.');
            return;
          }

          try {
            setProgressModalVisible(true);
            setProgress(0);

            const trailerResponse = await axios.get('http://127.0.0.1:8000/api/s3-Trailers', {
              params: {
                file_name: trailer.name,
                file_type: trailer.type,
              },
            });

            const signedUrl = trailerResponse.data.url;

            await axios.put(signedUrl, trailer, {
              headers: {
                'Content-Type': trailer.type,
              },
              onUploadProgress: (progressEvent) => {
                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                setProgress(percentCompleted);
              },
            });

            const trailerUrl = signedUrl.split('?')[0];
            formData.append('trailer', trailerUrl);
          } catch (error) {
            message.error('Failed to upload trailer.');
            setProgressModalVisible(false);
            return;
          }
        }

        if (movieList.length > 0) {
          const movie = movieList[0].originFileObj;

          if (!movie.type.startsWith('video/')) {
            message.error('Please upload only video files.');
            return;
          }

          try {
            setProgressModalVisible(true);
            setProgress(0);

            const movieResponse = await axios.get('http://127.0.0.1:8000/api/s3-Movies', {
              params: {
                file_name: movie.name,
                file_type: movie.type,
              },
            });

            const signedUrl = movieResponse.data.url;

            await axios.put(signedUrl, movie, {
              headers: {
                'Content-Type': movie.type,
              },
              onUploadProgress: (progressEvent) => {
                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                setProgress(percentCompleted);
              },
            });

            const movieUrl = signedUrl.split('?')[0];
            formData.append('movie', movieUrl);

            await axios.post('http://127.0.0.1:8000/api/movies', formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
              onUploadProgress: (progressEvent) => {
                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                setProgress(percentCompleted);
              },
            });

            message.success('Movie added successfully');
            form.resetFields();
            emailForm.resetFields();
            setFileList([]);
            setTrailerList([]);
            setMovieList([]);
            setProgressModalVisible(false);
            setModalVisible(false);
          } catch (error) {
            message.error('Failed to add movie.');
            setProgressModalVisible(false);
          }
        } else {
          message.error('Please upload a movie.');
        }
      } else {
        message.error('Failed to add user. Please check the credentials and try again.');
      }
    } catch (error) {
      console.error('Error adding movie or user:', error);
      message.error('Failed to add user or movie. Please check the credentials and try again.');
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
    return isImage;
  };

  const handleTrailerUpload = ({ fileList }) => {
    const isVideo = fileList.every(file => file.type.startsWith('video/'));
    if (isVideo) {
      setTrailerList(fileList);
    } else {
      message.error('You can only upload video files!');
      setTrailerList([]);
    }
    return isVideo;
  };

  const handleMovieUpload = ({ fileList }) => {
    const isVideo = fileList.every(file => file.type.startsWith('video/'));
    if (isVideo) {
      setMovieList(fileList);
    } else {
      message.error('You can only upload video files!');
      setMovieList([]);
    }
    return isVideo;
  };

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
        <Form.Item name="picture" label="Picture" valuePropName="fileList" getValueFromEvent={(e) => e && e.fileList} rules={[{ required: true, message: 'Please upload a cover image' }]}>
          <Upload
            name="picture"
            listType="picture"
            beforeUpload={() => false}
            onChange={handleUpload}
          >
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
        </Form.Item>
        <Form.Item name="trailer" label="Trailer" valuePropName="fileList" getValueFromEvent={(e) => e && e.fileList}>
          <Upload
            name="trailer"
            listType="picture"
            beforeUpload={() => false}
            onChange={handleTrailerUpload}
          >
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
        </Form.Item>
        <Form.Item name="movie" label="Movie" valuePropName="fileList" getValueFromEvent={(e) => e && e.fileList}>
          <Upload
            name="movie"
            listType="picture"
            beforeUpload={() => false}
            onChange={handleMovieUpload}
          >
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
          <Form.Item name="fullName" label="Full Name" rules={[{ required: true, message: 'Please enter your full name' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="phoneNumber" label="Phone Number" rules={[{ required: true, message: 'Please enter your phone number' }]}>
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">Submit</Button>
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
          Movie is still uploading...
        </div>
      </Modal>
    </div>
  );
};

export default AddMovieManagement;
