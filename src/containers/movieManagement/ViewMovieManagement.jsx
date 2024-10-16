import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ViewMovieManagement.css';
import { Form, Input, Button, Select, Upload, message, Modal, Spin, Progress } from 'antd';
import { UploadOutlined, ExclamationCircleOutlined, LoadingOutlined } from '@ant-design/icons';

const { Option } = Select;
const { confirm } = Modal;

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
  const [loading, setLoading] = useState(false);

  // Fetch movies on component mount
  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/movies');
        setMovies(response.data);
      } catch (error) {
        message.error('Failed to fetch movies!');
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  // Fetch selected movie data
  const fetchMovie = async (movieId) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/movies/${movieId}`);
      const movieData = response.data;
      const formData = {
        title: movieData.title,
        genre: movieData.genre,
        director: movieData.director,
        duration: movieData.duration,
        price: movieData.price,
      };
      setSelectedMovie(movieData);
      setTrailerUrl(movieData.trailer);
      form.setFieldsValue(formData);
      setIsMovieSelected(true);
    } catch (error) {
      message.error('Failed to fetch movie data!');
    } finally {
      setLoading(false);
    }
  };

  // Upload file function
  const handleUpload = async (file, type) => {
    const formData = new FormData();
    formData.append('file_name', file.name);
    formData.append('file_type', file.type);
    formData.append('object_type', type);

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
        },
      });

      return url.split('?')[0];
    } catch (error) {
      message.error('Failed to upload file. Please try again.');
      throw error;
    }
  };

  // Handle form submission (movie update)
  const handleSubmit = async (values) => {
    setModalAction('updating');
    setProgressModalVisible(true);
    setProgress(0);

    if (selectedMovie) {
      try {
        const updatedValues = { ...values };

        // Upload Picture
        if (imageList.length > 0) {
          const pictureFile = imageList[0].originFileObj;
          updatedValues.picture = await handleUpload(pictureFile, 'movieCoverImages');
        }

        // Upload Trailer
        if (trailerList.length > 0) {
          const trailerFile = trailerList[0].originFileObj;
          updatedValues.trailer = await handleUpload(trailerFile, 'movieTrailers');
        }

        // Upload Movie
        if (movieList.length > 0) {
          const movieFile = movieList[0].originFileObj;
          updatedValues.movie = await handleUpload(movieFile, 'movies');
        }

        await axios.put(`http://127.0.0.1:8000/api/movies/${selectedMovie.id}`, updatedValues);
        message.success('Movie updated successfully');
        setIsMovieSelected(false);
        form.resetFields();
      } catch (error) {
        message.error('Failed to update movie!');
      } finally {
        setProgressModalVisible(false);
      }
    }
  };

  // Handle delete with confirmation
  const showDeleteConfirm = () => {
    confirm({
      title: 'Are you sure you want to delete this movie?',
      icon: <ExclamationCircleOutlined />,
      content: 'This action cannot be undone.',
      onOk: handleDelete,
      okText: 'Yes, delete it',
      cancelText: 'No',
    });
  };

  // Handle movie deletion
  const handleDelete = async () => {
    setModalAction('deleting');
    setProgressModalVisible(true);
    setProgress(0);

    if (selectedMovie) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/movies/${selectedMovie.id}`, {
          data: {
            picture: selectedMovie.picture,
            trailer: selectedMovie.trailer,
            movie: selectedMovie.movie,
          },
        });
        message.success('Movie deleted successfully');
        setMovies(movies.filter((movie) => movie.id !== selectedMovie.id));
        setSelectedMovie(null);
        form.resetFields();
        setTrailerUrl('');
        setIsMovieSelected(false);
      } catch (error) {
        message.error('Failed to delete movie!');
      } finally {
        setProgressModalVisible(false);
      }
    }
  };

  const handleMovieChange = (value) => {
    fetchMovie(value);
  };

  const handleImageUpload = ({ fileList }) => {
    setImageList(fileList);
  };

  const handleTrailerUpload = ({ fileList }) => {
    setTrailerList(fileList);
  };

  const handleMovieUpload = ({ fileList }) => {
    setMovieList(fileList);
  };

  return (
    <section className='admin-movie-management'>
      <h2>View/Update/Delete Movie</h2>
      <Spin spinning={loading}>
        <div className="select-item-container">
          <Form.Item name="category" label="Film" rules={[{ required: true, message: 'Please select a film' }]}>
            <Select onChange={handleMovieChange} disabled={progressModalVisible}>
              {movies.map((movie) => (
                <Option key={movie.id} value={movie.id}>
                  {movie.title}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </div>
        <div className="movie-management-container">
          <div className="video-container">
            <h3>Trailer</h3>
            {trailerUrl && <video controls src={trailerUrl} alt="Movie Trailer" />}
          </div>
          <div className='movie-management-details'>
            <Form form={form} layout="vertical" onFinish={handleSubmit} className="details-form">
              <Form.Item
                name="title"
                label="Title"
                rules={[{ required: true, message: 'Please enter the movie title' }]}
              >
                <Input disabled={progressModalVisible} />
              </Form.Item>
              <Form.Item
                name="genre"
                label="Genre"
                rules={[{ required: true, message: 'Please enter the movie genre' }]}
              >
                <Input disabled={progressModalVisible} />
              </Form.Item>
              <Form.Item
                name="director"
                label="Director"
                rules={[{ required: true, message: 'Please enter the movie director' }]}
              >
                <Input disabled={progressModalVisible} />
              </Form.Item>
              <Form.Item
                name="duration"
                label="Duration (in minutes)"
                rules={[{ required: true, message: 'Please enter the movie duration' }]}
              >
                <Input type="number" disabled={progressModalVisible} />
              </Form.Item>
              <Form.Item
                name="price"
                label="Price"
                rules={[{ required: true, message: 'Please enter the movie price' }]}
              >
                <Input type="number" disabled={progressModalVisible} />
              </Form.Item>
              <Form.Item label="Upload Picture">
                <Upload accept="image/*" beforeUpload={() => false} onChange={handleImageUpload} fileList={imageList}>
                  <Button icon={<UploadOutlined />}>Upload Image</Button>
                </Upload>
              </Form.Item>
              <Form.Item label="Upload Trailer">
                <Upload accept="video/*" beforeUpload={() => false} onChange={handleTrailerUpload} fileList={trailerList}>
                  <Button icon={<UploadOutlined />}>Upload Trailer</Button>
                </Upload>
              </Form.Item>
              <Form.Item label="Upload Movie">
                <Upload accept="video/*" beforeUpload={() => false} onChange={handleMovieUpload} fileList={movieList}>
                  <Button icon={<UploadOutlined />}>Upload Movie</Button>
                </Upload>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" disabled={!isMovieSelected || progressModalVisible}>
                  Update Movie
                </Button>
                <Button type="primary" className='button-delete1' onClick={showDeleteConfirm} disabled={!isMovieSelected || progressModalVisible}>
                  Delete Movie
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
        <Modal
          title={modalAction === 'updating' ? 'Updating Movie' : 'Deleting Movie'}
          visible={progressModalVisible}
          footer={null}
          centered
        >
          <Spin
            indicator={
              <LoadingOutlined
                style={{ fontSize: 48, color: '#1890ff', marginBottom: '20px' }}
                spin
              />
            }
          />
          <h3>Uploading files... Please wait</h3>
          <Progress percent={progress} status="active" />
        </Modal>
      </Spin>
    </section>
  );
};

export default ViewMovieManagement;
