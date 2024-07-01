import React, { useState } from 'react';
import './movieManagement.css';

const MovieManagement = () => {
  const [newMovie, setNewMovie] = useState({ title: '', genre: '', director: '', duration: '', picture: null });
  const [movieToDelete, setMovieToDelete] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMovie({ ...newMovie, [name]: value });
  };

  const handleFileChange = (e) => {
    setNewMovie({ ...newMovie, picture: e.target.files[0] });
  };

  return (
    <div className="admin-movie-container">
      <h1>Movie Management</h1>
      <table className="admin-movie-table">
        <thead>
          <tr>
            <th className="admin-movie-table-header">Title</th>
            <th className="admin-movie-table-header">Genre</th>
            <th className="admin-movie-table-header">Director</th>
            <th className="admin-movie-table-header">Duration</th>
            <th className="admin-movie-table-header">Picture</th>
          </tr>
        </thead>
      </table>

      <h2>Add New Movie</h2>
      <form className="admin-movie-form">
        <input type="text" name="title" placeholder="Title" onChange={handleInputChange} className="admin-movie-input" />
        <input type="text" name="genre" placeholder="Genre" onChange={handleInputChange} className="admin-movie-input" />
        <input type="text" name="director" placeholder="Director" onChange={handleInputChange} className="admin-movie-input" />
        <input type="text" name="duration" placeholder="Duration (in minutes)" onChange={handleInputChange} className="admin-movie-input"/>
        <input type="file" name="picture" onChange={handleFileChange} className="admin-movie-input" />
        <button type="button" className="admin-movie-button">Add Movie</button>
      </form>

      <h2>Update Movie</h2>
      <form className="admin-movie-form">
        <input type="text" name="title" placeholder="Title" onChange={handleInputChange} className="admin-movie-input" />
        <input type="text" name="genre" placeholder="Genre" onChange={handleInputChange} className="admin-movie-input" />
        <input type="text" name="director" placeholder="Director" onChange={handleInputChange} className="admin-movie-input" />
        <input type="text" name="duration" placeholder="Duration (in minutes)" onChange={handleInputChange} className="admin-movie-input" />
        <input type="file" name="picture" onChange={handleFileChange} className="admin-movie-input" />
        <button type="button" className="admin-movie-button">Update Movie</button>
      </form>

      <h2>Delete Movie</h2>
      <form className="admin-movie-form">
        <input type="text" name="title" placeholder="Title" onChange={(e) => setMovieToDelete(e.target.value)} className="admin-movie-input" />
        <button type="button"  className="admin-movie-button">Delete Movie</button>
      </form>
    </div>
  );
};

export default MovieManagement;
