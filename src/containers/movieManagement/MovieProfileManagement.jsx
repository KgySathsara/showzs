import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './movieManagement.css';
import { Form, Input, Card } from 'antd';

const MovieProfileManagement = () => {
  const [form] = Form.useForm();
  const [movie, setMovie] = useState(null);
  const [monthlyRevenue, setMonthlyRevenue] = useState(0);
  const [profileViews, setProfileViews] = useState(0); // New state for profile views

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/movie');
        const movieData = response.data;

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

        // Fetch the monthly revenue for this movie title
        const revenueResponse = await axios.get('http://127.0.0.1:8000/api/movie-revenue', {
          params: { title: movieData.title }
        });
        setMonthlyRevenue(revenueResponse.data.monthly_revenue);

        // Fetch the profile views for this movie title
        const profileViewsResponse = await axios.get('http://127.0.0.1:8000/api/movie-views', {
          params: { title: movieData.title }
        });
        setProfileViews(profileViewsResponse.data.count);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchMovie();
  }, [form]);

  return (
    <section className='admin-movie-management'>
      <h2>Movie Profile</h2>
      <div className='movie-profile-card'>
        <Card title="Monthly Revenue" className='profile-card'>
          <p>{monthlyRevenue} LKR</p>
        </Card>
        <Card title="Profile Views" className='profile-card'>
          <p>{profileViews}</p>
        </Card>
      </div>
      <div className="movie-management-container">
        <div className="video-container">
          <h3>Trailer</h3>
          {movie && (
            <video controls src={movie.trailer} alt="Movie Trailer" />
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
