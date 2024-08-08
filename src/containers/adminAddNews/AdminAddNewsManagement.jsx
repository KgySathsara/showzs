import React, { useState } from 'react';
import './adminAddNews.css';
import { Form, Input, Button, DatePicker, Select, InputNumber, Upload, message, Modal, Spin, Progress } from 'antd';
import { UploadOutlined, LoadingOutlined } from '@ant-design/icons';
import axios from 'axios';

const { TextArea } = Input;
const { Option } = Select;

const AdminAddNewManagement = () => {
  const [trailerList, setTrailerList] = useState([]);
  const [progressModalVisible, setProgressModalVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  const onFinish = async (values) => {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('date', values.date.format('YYYY-MM-DD'));
    formData.append('duration', values.duration);
    formData.append('category', values.category);
    formData.append('description', values.description);
    formData.append('price', values.price);

    if (trailerList.length > 0) {
      const trailerFile = trailerList[0].originFileObj;

      // Check for correct file type
      if (!trailerFile.type.startsWith('video/')) {
        message.error('Please upload only video files.');
        return;
      }

      try {
        setProgressModalVisible(true);
        setProgress(0);

        const response = await axios.get('http://localhost:8000/api/s3-Trailers', {
          params: {
            file_name: trailerFile.name,
            file_type: trailerFile.type,
          },
        });

        const signedUrl = response.data.url;

        await axios.put(signedUrl, trailerFile, {
          headers: {
            'Content-Type': trailerFile.type,
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setProgress(percentCompleted);
          },
        });

        const trailerUrl = signedUrl.split('?')[0];
        formData.append('trailer', trailerUrl);

        await axios.post('http://localhost:8000/api/news', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setProgress(percentCompleted);
          },
        });

        message.success('News added successfully!');
        setTrailerList([]);
        setProgressModalVisible(false);
      } catch (error) {
        console.error('Error uploading trailer:', error.message);
        message.error('Failed to upload trailer. Please try again.');
        setProgressModalVisible(false);
      }
    } else {
      message.error('Please upload a trailer.');
    }
  };

  const handleFileChange = ({ fileList }) => {
    const isVideo = fileList.every(file => file.type.startsWith('video/'));
    if (isVideo) {
      setTrailerList(fileList);
    } else {
      message.error('Please upload only video files.');
      setTrailerList([]);
    }
  };

  return (
    <section className='admin-upcoming-movies'>
      <h2>Add News</h2>
      <Form
        name="add-news"
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item
          name="title"
          rules={[{ required: true, message: 'Please input the news title!' }]}
        >
          <Input placeholder='News Title' />
        </Form.Item>
        <Form.Item
          name="trailer"
          rules={[{ required: true, message: 'Please upload the trailer!' }]}
        >
          <Upload
            name="trailer"
            listType="picture"
            beforeUpload={() => false}
            onChange={handleFileChange}
          >
            <Button icon={<UploadOutlined />}>Upload Trailer</Button>
          </Upload>
        </Form.Item>
        <Form.Item
          name="date"
          rules={[{ required: true, message: 'Please select the release date!' }]}
        >
          <DatePicker placeholder='Select Release Date' />
        </Form.Item>
        <Form.Item
          name="duration"
          rules={[{ required: true, message: 'Please input the news duration!' }]}
        >
          <Input placeholder='Duration (e.g., 2h 30m)' />
        </Form.Item>
        <Form.Item
          name="category"
          rules={[{ required: true, message: 'Please select the news category!' }]}
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
          rules={[{ required: true, message: 'Please input the news description!' }]}
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
            Add News
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
          News is uploading...
        </div>
      </Modal>
    </section>
  );
};

export default AdminAddNewManagement;
