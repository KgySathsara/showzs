import React, { useEffect, useState } from 'react';
import './AdminUpcomingMovies.css';
import { Form, Input, Button, DatePicker, Select, InputNumber, Upload, message, Modal, Spin, Progress } from 'antd';
import { UploadOutlined, LoadingOutlined } from '@ant-design/icons';
import axios from 'axios';
import moment from 'moment';

const { TextArea } = Input;
const { Option } = Select;

const AdminEditUpcomingMovie = () => {
  const [form] = Form.useForm();
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isMovieSelected, setIsMovieSelected] = useState(false);
  const [progressModalVisible, setProgressModalVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [modalAction, setModalAction] = useState('');
  const [isValidFile, setIsValidFile] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/upcoming-movies');
        console.log('Movie data:', response.data);
        setMovies(response.data);
      } catch (error) {
        console.error('Failed to fetch movies:', error);
      }
    };
    fetchMovies();
  }, []);

  const fetchMovie = async (movieId) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/upcoming-movies/${movieId}`);
      const formData = {
        title: response.data.title,
        date: moment(response.data.date),
        duration: response.data.duration,
        category: response.data.category,
        description: response.data.description,
        price: response.data.price,
      };
      setSelectedMovie(response.data);
      form.setFieldsValue(formData);
      setIsMovieSelected(true);
    } catch (error) {
      console.error('Failed to fetch movie data:', error);
    }
  };

  const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append('file_name', file.name);
    formData.append('file_type', file.type);
    formData.append('object_type', 'movieCoverImages');

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/s3-upload-url', formData);
      const { url } = response.data;

      await axios.put(url, file, {
        headers: {
          'Content-Type': file.type,
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setProgress(percentCompleted);
        }
      });

      return url.split('?')[0];
    } catch (error) {
      console.error('Failed to upload file:', error);
      message.error('Failed to upload file');
      throw error;
    }
  };

  const handleSubmit = async (values) => {
    setModalAction('updating');
    setProgressModalVisible(true);
    setProgress(0);
    if (selectedMovie) {
      try {
        const formattedValues = {
          ...values,
          date: values.date ? moment(values.date).format('YYYY-MM-DD HH:mm:ss') : null,
        };

        if (isValidFile.length > 0) {
          const imageFile = isValidFile[0].originFileObj;

          if (!imageFile.type.startsWith('image/')) {
            message.error('Please upload only image files.');
            return;
          }

          formattedValues.image = await handleUpload(imageFile);
        }

        await axios.put(`http://127.0.0.1:8000/api/upcoming-movies/${selectedMovie.id}`, formattedValues, {
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setProgress(percentCompleted);
          }
        });
        message.success('Movie updated successfully');
        setIsMovieSelected(false);
        setProgressModalVisible(false);
      } catch (error) {
        console.error('Failed to update movie:', error);
        message.error('Failed to update movie');
        setProgressModalVisible(false);
      }
    }
  };

  const handleDelete = async () => {
    setModalAction('deleting');
    setProgressModalVisible(true);
    setProgress(0);
    if (selectedMovie) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/upcoming-movies/${selectedMovie.id}`, {
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setProgress(percentCompleted);
          }
        });

        if (selectedMovie.image) {
          await axios.post('http://127.0.0.1:8000/api/s3-delete-object', {
              object_type: 'movieCoverImages',
              file_name: selectedMovie.image,
          });
      }

        message.success('Movie deleted successfully');
        setMovies(movies.filter(movie => movie.id !== selectedMovie.id));
        setSelectedMovie(null);
        form.resetFields();
        setIsMovieSelected(false);
        setProgressModalVisible(false);
      } catch (error) {
        console.error('Failed to delete movie:', error);
        message.error('Failed to delete movie');
        setProgressModalVisible(false);
      }
    }
  };

  const handleMovieChange = (value) => {
    console.log('Selected movie:', value);
    fetchMovie(value);
  };

  const validateFile = ({ fileList }) => {
    const isValidType = fileList.every(file => file.type.startsWith('image/'));
    if (isValidType) {
      setIsValidFile(fileList);
    } else {
      message.error('You can only upload JPG/PNG file!');
      setIsValidFile([]);
    }
  };

  return (
    <section className='admin-upcoming-movies'>
      <h2>Edit or Delete Upcoming Movie</h2>
      <div className="select-item-container">
        <Form.Item name="movieSelection" label="Upcoming Movie" rules={[{ required: true, message: 'Please select an Upcoming Movie' }]}>
          <Select onChange={handleMovieChange} placeholder="Select Upcoming Movie">
            {movies.map(movie => (
              <Option key={movie.id} value={movie.id}>{movie.title}</Option>
            ))}
          </Select>
        </Form.Item>
      </div>
      <Form form={form} name="edit-movie" layout="vertical" onFinish={handleSubmit} >
        <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Please enter the movie title' }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="date" label="Release Date"
          rules={[{ required: true, message: 'Please select the release date!' }]}
        >
          <DatePicker placeholder='Select Release Date' />
        </Form.Item>
        <Form.Item
          name="duration" label="Duration"
          rules={[{ required: true, message: 'Please input the movie duration!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="category" label="Category"
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
        <Form.Item name="image" label="Picture">
          <Upload
            name="image"
            listType="picture"
            beforeUpload={() => false}
            onChange={validateFile}
            maxCount={1}
          >
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
        </Form.Item>
        <div className="form-buttons">
          <Button type="primary" className='btn-movie-management' htmlType="submit">
            {isMovieSelected ? 'Edit Movie' : 'Submit Movie'}
          </Button>
            <Button type="primary" className='btn-movie-management' htmlType="button" onClick={handleDelete}>
              Delete Movie
            </Button>
        </div>
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
          {modalAction === 'updating' ? 'Movie is updating...' : 'Movie is deleting...'}
        </div>
      </Modal>
    </section>
  );
};

export default AdminEditUpcomingMovie;
