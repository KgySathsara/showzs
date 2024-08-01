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

  const handleUpload = async (file, type) => {
    const formData = new FormData();
    formData.append('file_name', file.name);
    formData.append('file_type', file.type);
    formData.append('object_type', type);

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/s3-upload-url', formData);
      const { url } = response.data;

      await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': file.type,
        },
        body: file,
      });

      return url.split('?')[0];
    } catch (error) {
      console.error('Failed to upload file:', error);
      message.error('Failed to upload file');
    }
  };

  const handleSubmit = async (values) => {
    if (selectedMovie) {
      try {
        const updatedValues = { ...values };

        if (values.picture && values.picture.fileList.length > 0) {
          const pictureFile = values.picture.fileList[0].originFileObj;
          updatedValues.picture = await handleUpload(pictureFile, 'movieCoverImages');
        } else {
          updatedValues.picture = null;
        }

        if (values.trailer && values.trailer.fileList.length > 0) {
          const trailerFile = values.trailer.fileList[0].originFileObj;
          updatedValues.trailer = await handleUpload(trailerFile, 'movieTrailers');
        } else {
          updatedValues.trailer = null;
        }

        if (values.movie && values.movie.fileList.length > 0) {
          const movieFile = values.movie.fileList[0].originFileObj;
          updatedValues.movie = await handleUpload(movieFile, 'movies');
        } else {
          updatedValues.movie = null;
        }

        await axios.put(`http://127.0.0.1:8000/api/movies/${selectedMovie.id}`, updatedValues);
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
        console.log('Selected Movie:', selectedMovie);
  
        // Delete the movie from the database
        await axios.delete(`http://127.0.0.1:8000/api/movies/${selectedMovie.id}`);
  
        // Delete the associated files from S3
        const deleteRequests = [];
  
        if (selectedMovie.picture) {
          console.log('Deleting Picture:', selectedMovie.picture);
          deleteRequests.push(
            axios.post('http://127.0.0.1:8000/api/s3-delete-object', {
              object_type: 'movieCoverImages',
              file_name: selectedMovie.picture,
            })
          );
        }
  
        if (selectedMovie.trailer) {
          console.log('Deleting Trailer:', selectedMovie.trailer);
          deleteRequests.push(
            axios.post('http://127.0.0.1:8000/api/s3-delete-object', {
              object_type: 'movieTrailers',
              file_name: selectedMovie.trailer,
            })
          );
        }
  
        if (selectedMovie.movie) {
          console.log('Deleting Movie File:', selectedMovie.movie);
          deleteRequests.push(
            axios.post('http://127.0.0.1:8000/api/s3-delete-object', {
              object_type: 'movies',
              file_name: selectedMovie.movie,
            })
          );
        }
  
        await Promise.all(deleteRequests);
  
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
            <video controls src={trailerUrl} alt="Movie Trailer" />
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
            <Form.Item name="trailer" label="Trailer">
              <Upload name="trailer" listType="picture" beforeUpload={() => false}>
                <Button icon={<UploadOutlined />}>Click to upload</Button>
              </Upload>
            </Form.Item>
            <Form.Item name="movie" label="Movie">
              <Upload name="movie" listType="picture" beforeUpload={() => false}>
                <Button icon={<UploadOutlined />}>Click to upload</Button>
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
