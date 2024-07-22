import React, { useEffect, useState } from 'react';
import './AdminUpcomingMovies.css';
import { Form, Input, Button, DatePicker, Select, InputNumber, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import moment from 'moment';

const { TextArea } = Input;
const { Option } = Select;

const AdminEditUpcomingMovie = () => {
  const [form] = Form.useForm();
  const [movies, setMovies] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isMovieSelected, setIsMovieSelected] = useState(false);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/upcoming-movies');
      setMovies(response.data);
    } catch (error) {
      console.error('Failed to fetch movies:', error);
    }
  };

  const handleMovieChange = async (movieId) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/upcoming-movies/${movieId}`);
      const movieData = response.data;
      setSelectedMovie(movieData);
      form.setFieldsValue({
        title: movieData.title,
        date: moment(movieData.date),
        duration: movieData.duration,
        category: movieData.category,
        description: movieData.description,
        price: movieData.price,
      });
      setPreviewImage(null);
      setIsMovieSelected(true);
    } catch (error) {
      console.error('Failed to fetch movie data:', error);
    }
  };

  const handleChange = ({ file }) => {
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file.originFileObj);
  };

  const onFinish = async (values) => {
    const formData = new FormData();
    formData.append('title', values.title);
    if (values.image && values.image[0]) {
      formData.append('image', values.image[0].originFileObj);
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
      fetchMovies();
    } catch (error) {
      console.error('Error adding movie:', error);
      message.error('Failed to add movie');
    }
  };

  const onFinishEdit = async (values) => {
    if (!selectedMovie) return;
    const formData = new FormData();
    formData.append('title', values.title);
    if (values.image && values.image[0]) {
      formData.append('image', values.image[0].originFileObj);
    }
    formData.append('date', values.date.format('YYYY-MM-DD'));
    formData.append('duration', values.duration);
    formData.append('category', values.category);
    formData.append('description', values.description);
    formData.append('price', values.price);

    try {
      await axios.put(`http://127.0.0.1:8000/api/upcoming-movies/${selectedMovie.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      message.success('Movie updated successfully');
      form.resetFields();
      setSelectedMovie(null);
      fetchMovies();
    } catch (error) {
      console.error('Error updating movie:', error);
      message.error('Failed to update movie');
    }
  };

  const handleDelete = async () => {
    if (selectedMovie) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/upcoming-movies/${selectedMovie.id}`);
        message.success('Movie deleted successfully');
        setMovies(movies.filter(movie => movie.id !== selectedMovie.id));
        setSelectedMovie(null);
        form.resetFields();
      } catch (error) {
        console.error('Failed to delete movie:', error);
        message.error('Failed to delete movie');
      }
    }
  };

  const handleFormChange = () => {
    setIsMovieSelected(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.error('Failed:', errorInfo);
  };

  return (
    <section className='admin-upcoming-movies'>
      <h2>Edit or Delete Upcoming Movie</h2>
      <div className="select-item-container">
        <Form.Item name="category" label="Film" rules={[{ required: true, message: 'Please select a film' }]}>
          <Select onChange={handleMovieChange} placeholder="Select Upcoming Movie">
            {movies.map(movie => (
              <Option key={movie.id} value={movie.id}>{movie.title}</Option>
            ))}
          </Select>
        </Form.Item>
      </div>
      <Form
        form={form}
        name="edit-movie"
        layout="vertical"
        onFinish={isMovieSelected ? onFinishEdit : onFinish}
        onFinishFailed={onFinishFailed}
        onValuesChange={handleFormChange}
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
          {previewImage && <img src={previewImage} alt="Image Preview" style={{ marginTop: 16, maxWidth: '100%' }} />}
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
        <div className="form-buttons">
          <Button type="primary" className='btn-movie-management' htmlType="submit">
            {isMovieSelected ? 'Submit Movie' : 'Edit Movie'}
          </Button>
          <Button type="primary" className='btn-movie-management' htmlType="button" onClick={handleDelete}>
            Delete Movie
          </Button>
        </div>
      </Form>
    </section>
  );
};

export default AdminEditUpcomingMovie;
