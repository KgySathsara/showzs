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
  const [imageList, setImageList] = useState([]);
  const [trailerList, setTrailerList] = useState([]);
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('http://showz-backend.socialgear.co.uk/api/movies');
        setMovies(response.data);
      } catch (error) {
        console.error('Failed to fetch movies:', error);
      }
    };

    fetchMovies();
  }, []);

  const fetchMovie = async (movieId) => {
    try {
      const response = await axios.get(`http://showz-backend.socialgear.co.uk/api/movies/${movieId}`);
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

  const handleUpload = async (file, type, baseProgress = 0) => {
    const formData = new FormData();
    formData.append('file_name', file.name);
    formData.append('file_type', file.type);
    formData.append('object_type', type);

    try {
      const response = await axios.post('http://showz-backend.socialgear.co.uk/api/s3-upload-url', formData);
      const { url } = response.data;

      await axios.put(url, file, {
        headers: {
          'Content-Type': file.type,
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setProgress(baseProgress + percentCompleted * 0.2);
        },
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
        const updatedValues = { ...values };

        if (imageList.length > 0) {
          const pictureFile = imageList[0].originFileObj;

          if (!pictureFile.type.startsWith('image/')) {
            message.error('You can only upload image files!');
            return;
          }
          updatedValues.picture = await handleUpload(pictureFile, 'movieCoverImages');
        }

        if (trailerList.length > 0) {
          const trailerFile = trailerList[0].originFileObj;

          if (!trailerFile.type.startsWith('video/')) {
            message.error('You can only upload video files!');
            return;
          }
          updatedValues.trailer = await handleUpload(trailerFile, 'movieTrailers');
        }

        if (movieList.length > 0) {
          const movieFile = movieList[0].originFileObj;

          if (!movieFile.type.startsWith('video/')) {
            message.error('You can only upload video files!');
            return;
          }
          updatedValues.movie = await handleUpload(movieFile, 'movies');
        }

        await axios.put(`http://showz-backend.socialgear.co.uk/api/movies/${selectedMovie.id}`, updatedValues, {
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
        await axios.delete(`http://showz-backend.socialgear.co.uk/api/movies/${selectedMovie.id}`, {
          data: {
            picture: selectedMovie.picture,
            trailer: selectedMovie.trailer,
            movie: selectedMovie.movie,
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setProgress(percentCompleted);
          }
        });

        message.success('Movie deleted successfully');
        setMovies(movies.filter(movie => movie.id !== selectedMovie.id));
        setSelectedMovie(null);
        form.resetFields();
        setTrailerUrl('');
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
    fetchMovie(value);
  };

  const handleImageUpload = ({ fileList }) => {
    const isImage = fileList.every(file => file.type.startsWith('image/'));
    if (isImage) {
      setImageList(fileList);
    } else {
      message.error('You can only upload image files!');
      setImageList([]);
    }
    return isImage;
  };

  const handleTrailerUpload = ({ fileList }) => {
    const isVideo = fileList.every(file => file.type.startsWith('video/'));
    if (isVideo) {
      setTrailerList(fileList);
    } else {
      message.error('You can only upload video files!');
      setTrailerList([]);
    }
    return isVideo;
  };

  const handleMovieUpload = ({ fileList }) => {
    const isVideo = fileList.every(file => file.type.startsWith('video/'));
    if (isVideo) {
      setMovieList(fileList);
    } else {
      message.error('You can only upload video files!');
      setMovieList([]);
    }
    return isVideo;
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
              <Upload name="picture" listType="picture" beforeUpload={() => false} onChange={handleImageUpload} maxCount={1}>
                <Button icon={<UploadOutlined />}>Click to upload</Button>
              </Upload>
            </Form.Item>
            <Form.Item name="trailer" label="Trailer">
              <Upload name="trailer" listType="picture" beforeUpload={() => false} onChange={handleTrailerUpload} maxCount={1}>
                <Button icon={<UploadOutlined />}>Click to upload</Button>
              </Upload>
            </Form.Item>
            <Form.Item name="movie" label="Movie">
              <Upload name="movie" listType="picture" beforeUpload={() => false} onChange={handleMovieUpload} maxCount={1}>
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
