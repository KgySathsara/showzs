import React, { useState } from 'react';
import './AdminUpcomingMovies.css';
import { Form, Input, Button, DatePicker, Select, InputNumber, Upload, message, Modal, Spin, Progress } from 'antd';
import { UploadOutlined, LoadingOutlined } from '@ant-design/icons';
import axios from 'axios';

const { TextArea } = Input;
const { Option } = Select;

const AdminUpcomingMovies = () => {
  const [form] = Form.useForm();
  const [previewImage, setPreviewImage] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [progress, setProgress] = useState(0);
  const [progressModalVisible, setProgressModalVisible] = useState(false);

  const handleImagePreview = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const getSignedUrl = async (file) => {
    try {
      setProgress(0);
      const response = await axios.get('http://127.0.0.1:8000/api/s3-CoverImages', {
        params: {
          file_name: file.name,
          file_type: file.type,
        },
      });
      return response.data.url;
    } catch (error) {
      console.error('Error getting signed URL:', error);
      message.error('Failed to get signed URL');
      throw error;
    }
  };

  const uploadToS3 = async (signedUrl, file) => {
    try {
      await axios.put(signedUrl, file, {
        headers: {
          'Content-Type': file.type,
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setProgress(percentCompleted);
        }
      });
      return signedUrl.split('?')[0]; 
    } catch (error) {
      console.error('Error uploading to S3:', error);
      message.error('Failed to upload image to S3');
      throw error;
    }
  };

  const onFinish = async (values) => {
    setProgressModalVisible(true);
    const formData = new FormData();
    formData.append('title', values.title);
    if (fileList.length > 0 && fileList[0].originFileObj) {
      try {
        const signedUrl = await getSignedUrl(fileList[0].originFileObj);
        const imageUrl = await uploadToS3(signedUrl, fileList[0].originFileObj);
        formData.append('image', imageUrl);
      } catch (error) {
        console.error('Error processing image upload:', error);
        setProgressModalVisible(false);
        return;
      }
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
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setProgress(percentCompleted);
        }
      });
      message.success('Movie added successfully');
      form.resetFields();
      setPreviewImage(null);
      setFileList([]);
      setProgressModalVisible(false);
    } catch (error) {
      console.error('Error adding movie:', error);
      setProgressModalVisible(false);
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
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
      setFileList([]);
      return;
    }

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
          Movie is uploading...
        </div>
      </Modal>
    </section>
  );
}

export default AdminUpcomingMovies;
