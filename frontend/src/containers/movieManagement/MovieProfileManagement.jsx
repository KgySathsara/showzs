import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './movieManagement.css';
import { Form, Input, Card } from 'antd';

const MovieProfileManagement = () => {
  const [form] = Form.useForm();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/movie');
        console.log('Movie data:', response.data);
        const movieData = response.data;

        // Map API response to form fields
        const formData = {
          title: movieData.title,
          genre: movieData.genre,
          director: movieData.director,
          duration: movieData.duration,
          price: movieData.price,
          streamLink: movieData.stream_link,
        };

        setMovie(movieData);
        form.setFieldsValue(formData);
      } catch (error) {
        console.error('Failed to fetch movie data:', error);
      }
    };

    fetchMovie();
  }, [form]);

  return (
    <section className='admin-movie-management'>
      <h2>Movie Profile</h2>
      <div className='movie-profile-card'>
        <Card title="Monthly Revenue" className='profile-card'>
          <p>Monthly Revenue Content</p>
        </Card>
        <Card title="Profile Views" className='profile-card'>
          <p>Profile Views Content</p>
        </Card>
      </div>
      <div className="movie-management-container">
        <div className="video-container">
          <h3>Trailer</h3>
          {movie && (
            <video controls src={`http://localhost:8000/trailers/${movie.trailer}`} alt="Movie Trailer" />
          )}
        </div>
        <div className='movie-profile-management'>
          <Form form={form} layout="vertical" className="details-form">
            <Form.Item name="title" label="Title">
              <Input disabled />
            </Form.Item>
            <Form.Item name="genre" label="Genre">
              <Input disabled />
            </Form.Item>
            <Form.Item name="director" label="Director">
              <Input disabled />
            </Form.Item>
            <Form.Item name="duration" label="Duration (in minutes)">
              <Input type="number" disabled />
            </Form.Item>
            <Form.Item name="price" label="Ticket Price">
              <Input disabled />
            </Form.Item>
            <Form.Item name="streamLink" label="Stream Link">
              <Input disabled />
            </Form.Item>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default MovieProfileManagement;
