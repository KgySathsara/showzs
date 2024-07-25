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
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isMovieSelected, setIsMovieSelected] = useState(false);

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
      const movieData = response.data;
      setSelectedMovie(movieData);
      form.setFieldsValue({
        title: movieData.title,
        date: moment(movieData.date),
        duration: movieData.duration,
        category: movieData.category,
        description: movieData.description,
        price: movieData.price,
        image: movieData.image ? [{ url: movieData.image }] : [],
      });
      setIsMovieSelected(true);
    } catch (error) {
      console.error('Failed to fetch movie data:', error);
    }
  };

  const handleSubmit = async (values) => {
    if (selectedMovie) {
      try {
        const formattedValues = {
          ...values,
          date: values.date ? moment(values.date).format('YYYY-MM-DD HH:mm:ss') : null,
        };
        const response = await axios.put(`http://127.0.0.1:8000/api/upcoming-movies/${selectedMovie.id}`, formattedValues);
        console.log('Movie updated:', response.data);
        message.success('Movie updated successfully');
        setIsMovieSelected(false);
      } catch (error) {
        console.error('Failed to update movie:', error);
        message.error('Failed to update movie');
      }
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

  const handleMovieChange = (value) => {
    console.log('Selected movie:', value);
    fetchMovie(value);
  };

  return (
    <section className='admin-upcoming-movies'>
      <h2>Edit or Delete Upcoming Movie</h2>
      <div className="select-item-container">
        <Form.Item name="category" label="Upcoming Movie" rules={[{ required: true, message: 'Please select a Upcoming Movie' }]}>
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
        <Form.Item name="picture" label="Picture">
          <Upload name="picture" listType="picture" beforeUpload={() => false}>
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
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
