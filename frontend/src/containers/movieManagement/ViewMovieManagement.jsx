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
  const [isMovieSelected, setIsMovieSelected] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/movies');
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
      const movieData = response.data;
      const formData = {
        title: movieData.title,
        genre: movieData.genre,
        director: movieData.director,
        duration: movieData.duration,
        price: movieData.price,
        stream_link: movieData.stream_link,
      };
      setSelectedMovie(movieData);
      setTrailerUrl(movieData.trailer);
      form.setFieldsValue(formData);
      setIsMovieSelected(true);
    } catch (error) {
      console.error('Failed to fetch movie data:', error);
    }
  };

  const handleSubmit = async (values) => {
    if (selectedMovie) {
      try {
        await axios.put(`http://127.0.0.1:8000/api/movies/${selectedMovie.id}`, values);
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
        await axios.delete(`http://127.0.0.1:8000/api/movies/${selectedMovie.id}`);
        message.success('Movie deleted successfully');
        setMovies(movies.filter(movie => movie.id !== selectedMovie.id));
        setSelectedMovie(null);
        form.resetFields();
        setTrailerUrl('');
        setIsMovieSelected(false);
      } catch (error) {
        console.error('Failed to delete movie:', error);
        message.error('Failed to delete movie');
      }
    }
  };

  const handleMovieChange = (value) => {
    fetchMovie(value);
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
          {trailerUrl && (
            <video controls src={`http://localhost:8000/trailers/${trailerUrl}`} alt="Movie Trailer" />
          )}
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
            <Form.Item name="stream_link" label="Stream Link" rules={[{ required: true, message: 'Please enter the stream link' }]}>
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
              <Button type="primary" className='btn-movie-management' htmlType="submit">
                {isMovieSelected ? 'Update Movie' : 'Edit Movie'}
              </Button>
              <Button type="primary" className='btn-movie-management' htmlType="button" onClick={handleDelete}>Delete Movie</Button>
            </div>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default ViewMovieManagement;
