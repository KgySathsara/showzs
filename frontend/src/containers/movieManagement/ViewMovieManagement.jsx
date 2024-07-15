import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ViewMovieManagement.css';
import { Form, Input, Button, Select, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { Option } = Select;

const ViewMovieManagement = () => {
  const [form] = Form.useForm();
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [trailerUrl, setTrailerUrl] = useState('');

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/movies');
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
      const response = await axios.get(`http://127.0.0.1:8000/api/movies/${movieId}`);
      console.log('Movie data:', response.data); 
      const movieData = response.data;
      const formData = {
        title: movieData.title,
        genre: movieData.genre,
        director: movieData.director,
        duration: movieData.duration,
        price: movieData.price,
        streamLink: movieData.stream_link,
      };
      setSelectedMovie(movieData);
      setTrailerUrl(movieData.trailer); // Assuming trailer URL is available in movieData.trailer
      form.setFieldsValue(formData);
    } catch (error) {
      console.error('Failed to fetch movie data:', error);
    }
  };

  const handleSubmit = async (values) => {
    if (selectedMovie) {
      try {
        const response = await axios.put(`http://127.0.0.1:8000/api/movies/${selectedMovie.id}`, values);
        console.log('Movie updated:', response.data);
        message.success('Movie updated successfully');
        form.resetFields();
      } catch (error) {
        console.error('Failed to update movie:', error);
        message.error('Failed to update movie');
      }
    }
  };

  const handleDelete = async () => {
    if (selectedMovie) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/movies/${selectedMovie.id}`);
        console.log('Movie deleted');
        message.success('Movie deleted successfully');
        setMovies(movies.filter(movie => movie.id !== selectedMovie.id));
        setSelectedMovie(null);
        form.resetFields();
        setTrailerUrl('');
      } catch (error) {
        console.error('Failed to delete movie:', error);
        message.error('Failed to delete movie');
      }
    }
  };

  const handleMovieChange = (value) => {
    console.log('Selected movie:', value);
    fetchMovie(value); // Fetch details of the selected movie
  };

  return (
    <section className='admin-movie-management'>
      <h2>View/Update/Delete Movie</h2>
      <div className="select-item-container">
        <Form.Item name="category" label="Film" rules={[{ required: true, message: 'Please select a film' }]}>
          <Select onChange={handleMovieChange}>
            {movies.map(movie => (
              <Option key={movie.id} value={movie.id}>{movie.title}</Option>
            ))}
          </Select>
        </Form.Item>
      </div>
      <div className="movie-management-container">
        <div className="video-container">
          <h3>Trailer</h3>
          <video controls src={trailerUrl} alt="Movie Trailer" />
        </div>
        <div className='movie-management-details'>
          <Form form={form} layout="vertical" onFinish={handleSubmit} className="details-form">
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
            <Form.Item name="picture" label="Picture">
              <Upload name="picture" listType="picture" beforeUpload={() => false}>
                <Button icon={<UploadOutlined />}>Click to upload</Button>
              </Upload>
            </Form.Item>
            <Form.Item name="image" label="Image or Video">
              <Upload name="image" listType="picture" beforeUpload={() => false}>
                <Button icon={<UploadOutlined />}>Upload Movie Media</Button>
              </Upload>
            </Form.Item>
            <div className="form-buttons">
              <Button type="primary" className='btn-movie-management' htmlType="submit">Edit Movie</Button>
              <Button type="primary" className='btn-movie-management' htmlType="button" onClick={handleDelete}>Delete Movie</Button>
            </div>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default ViewMovieManagement;
