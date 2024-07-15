import React, { useState } from 'react';
import './adminAddNews.css';
import { Form, Input, Button, DatePicker, Select, InputNumber, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';

const { TextArea } = Input;
const { Option } = Select;

const AdminAddNewManagement = () => {
  const [formData, setFormData] = useState({});
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    setLoading(true);
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('image', fileList[0].originFileObj);
    formData.append('date', values.date.format('YYYY-MM-DD'));
    formData.append('duration', values.duration);
    formData.append('category', values.category);
    formData.append('description', values.description);
    formData.append('price', values.price);

    axios.post('https://streamingplatform.com/api/add-news', formData)
      .then(response => {
        message.success('News added successfully!');
        setLoading(false);
        setFormData({});
        setFileList([]);
      })
      .catch(error => {
        message.error('Failed to add news. Please try again.');
        setLoading(false);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const beforeUpload = (file) => {
    const isImageOrVideo = file.type.startsWith('image/') || file.type.startsWith('video/');
    if (!isImageOrVideo) {
      message.error('You can only upload image or video files!');
    }
    return isImageOrVideo || Upload.LIST_IGNORE;
  };

  const handleFileChange = ({ fileList }) => setFileList(fileList);

  return (
    <section className='admin-upcoming-movies'>
      <h2>Add News</h2>
      <Form
        name="add-movie"
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          name="title"
          rules={[{ required: true, message: 'Please input the movie title!' }]}
        >
          <Input placeholder='Movie Title' />
        </Form.Item>
        <Form.Item
          name="image"
          rules={[{ required: true, message: 'Please upload the movie image or video!' }]}
        >
          <Upload
            name="image"
            listType="picture"
            beforeUpload={beforeUpload}
            onChange={handleFileChange}
          >
            <Button icon={<UploadOutlined />}>Upload Movie Media</Button>
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
          <Button type="primary" htmlType="submit" loading={loading}>
            Add News
          </Button>
        </Form.Item>
      </Form>

      <div className="form-preview">
        {formData.title && <p><strong>Title:</strong> {formData.title}</p>}
        {fileList.length > 0 && (
          <div>
            {fileList[0].type.startsWith('image/') ? (
              <img src={URL.createObjectURL(fileList[0].originFileObj)} alt="Uploaded" style={{ width: '150px' }} />
            ) : (
              <video width="300" controls>
                <source src={URL.createObjectURL(fileList[0].originFileObj)} type={fileList[0].type} />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        )}
        {formData.date && <p><strong>Release Date:</strong> {formData.date.format('YYYY-MM-DD')}</p>}
        {formData.duration && <p><strong>Duration:</strong> {formData.duration}</p>}
        {formData.category && <p><strong>Category:</strong> {formData.category}</p>}
        {formData.description && <p><strong>Description:</strong> {formData.description}</p>}
        {formData.price !== undefined && <p><strong>Ticket Price:</strong> ${formData.price}</p>}
      </div>
    </section>
  );
}

export default AdminAddNewManagement;
