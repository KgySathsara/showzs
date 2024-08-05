import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ViewMovieManagement.css';
import { Form, Input, Button, Select, Upload, message, Modal, Spin, Progress } from 'antd';
import { UploadOutlined, LoadingOutlined } from '@ant-design/icons';

const { Option } = Select;

const ViewMovieManagement = () => {
  const [form] = Form.useForm();
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [trailerUrl, setTrailerUrl] = useState('');
  const [isMovieSelected, setIsMovieSelected] = useState(false);
  const [progressModalVisible, setProgressModalVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [modalAction, setModalAction] = useState('');

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
      setModalAction('updating'); 
      setProgressModalVisible(true);
      setProgress(0);

      try {
        const updatedValues = { ...values };

        if (values.picture && values.picture.fileList.length > 0) {
          const pictureFile = values.picture.fileList[0].originFileObj;
          updatedValues.picture = await handleUpload(pictureFile, 'movieCoverImages');
          setProgress((prev) => prev + 20);
        } else {
          delete updatedValues.picture;
        }

        if (values.trailer && values.trailer.fileList.length > 0) {
          const trailerFile = values.trailer.fileList[0].originFileObj;
          updatedValues.trailer = await handleUpload(trailerFile, 'movieTrailers');
          setProgress((prev) => prev + 20);
        } else {
          delete updatedValues.trailer;
        }

        if (values.movie && values.movie.fileList.length > 0) {
          const movieFile = values.movie.fileList[0].originFileObj;
          updatedValues.movie = await handleUpload(movieFile, 'movies');
          setProgress((prev) => prev + 20);
        } else {
          delete updatedValues.movie;
        }

        await axios.put(`http://127.0.0.1:8000/api/movies/${selectedMovie.id}`, updatedValues);
        message.success('Movie updated successfully');
        setIsMovieSelected(false);
        setProgress(100);
      } catch (error) {
        console.error('Failed to update movie:', error);
        message.error('Failed to update movie');
      } finally {
        setTimeout(() => setProgressModalVisible(false), 500);
      }
    }
  };

  const handleDelete = async () => {
    if (selectedMovie) {
      setModalAction('deleting'); 
      setProgressModalVisible(true);
      setProgress(0);

      try {
        await axios.delete(`http://127.0.0.1:8000/api/movies/${selectedMovie.id}`);
        setProgress(30);

        const deleteRequests = [];

        if (selectedMovie.picture) {
          deleteRequests.push(
            axios.post('http://127.0.0.1:8000/api/s3-delete-object', {
              object_type: 'movieCoverImages',
              file_name: selectedMovie.picture,
            })
          );
        }

        if (selectedMovie.trailer) {
          deleteRequests.push(
            axios.post('http://127.0.0.1:8000/api/s3-delete-object', {
              object_type: 'movieTrailers',
              file_name: selectedMovie.trailer,
            })
          );
        }

        if (selectedMovie.movie) {
          deleteRequests.push(
            axios.post('http://127.0.0.1:8000/api/s3-delete-object', {
              object_type: 'movies',
              file_name: selectedMovie.movie,
            })
          );
        }

        await Promise.all(deleteRequests);
        setProgress(100);

        message.success('Movie deleted successfully');
        setMovies(movies.filter(movie => movie.id !== selectedMovie.id));
        setSelectedMovie(null);
        form.resetFields();
        setTrailerUrl('');
        setIsMovieSelected(false);
      } catch (error) {
        console.error('Failed to delete movie:', error);
        message.error('Failed to delete movie');
      } finally {
        setTimeout(() => setProgressModalVisible(false), 500);
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
          {modalAction === 'updating' ? 'Movie is still updating...' : 'Movie is deleting...'}
        </div>
      </Modal>
    </section>
  );
};

export default ViewMovieManagement;
