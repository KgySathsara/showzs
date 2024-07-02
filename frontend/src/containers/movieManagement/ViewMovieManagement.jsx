import React from 'react';
import { Table } from 'antd';
import './movieManagement.css';

const ViewMovieManagement = () => {
  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Genre',
      dataIndex: 'genre',
      key: 'genre',
    },
    {
      title: 'Director',
      dataIndex: 'director',
      key: 'director',
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      key: 'duration',
    },
    {
      title: 'Picture',
      dataIndex: 'picture',
      key: 'picture',
      render: (text, record) => (
        <img src={record.picture} alt={record.title} style={{ width: 50 }} />
      ),
    },
  ];

//Data

  const data = [
    {
      key: '1',
      title: 'Movie 1',
      genre: 'Genre 1',
      director: 'Director 1',
      duration: '120',
      picture: 'https://via.placeholder.com/50',
    },
  ];

  return (
    <div className="admin-movie-container">
      <h2>View Movie</h2>
      <Table columns={columns} dataSource={data} className="admin-movie-table" />
    </div>
  );
};

export default ViewMovieManagement;
