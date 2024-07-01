import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './movieManagement.css';

const MovieManagement = () => {
  const [movies, setMovies] = useState([]);
  const [newMovie, setNewMovie] = useState({ title: '', genre: '', director: '', duration: '' });
  const [editingMovie, setEditingMovie] = useState(null);

  useEffect(() => {
    // Fetch movies from the server
    axios.get('/api/movies')
      .then(response => setMovies(response.data))
      .catch(error => console.error('Error fetching movies:', error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMovie({ ...newMovie, [name]: value });
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditingMovie({ ...editingMovie, [name]: value });
  };

  const addMovie = () => {
    axios.post('/api/movies', newMovie)
      .then(response => setMovies([...movies, response.data]))
      .catch(error => console.error('Error adding movie:', error));
  };

  const updateMovie = (id) => {
    axios.put(`/api/movies/${id}`, editingMovie)
      .then(response => {
        setMovies(movies.map(movie => movie.id === id ? response.data : movie));
        setEditingMovie(null);
      })
      .catch(error => console.error('Error updating movie:', error));
  };

  const deleteMovie = (id) => {
    axios.delete(`/api/movies/${id}`)
      .then(() => setMovies(movies.filter(movie => movie.id !== id)))
      .catch(error => console.error('Error deleting movie:', error));
  };

  const startEditing = (movie) => {
    setEditingMovie(movie);
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
            <th className="admin-movie-table-header">Actions</th>
          </tr>
        </thead>
        <tbody>
          {movies.map(movie => (
            <tr key={movie.id} className={movies.indexOf(movie) % 2 === 0 ? 'admin-movie-table-row-even' : ''}>
              <td className="admin-movie-table-cell">
                {editingMovie?.id === movie.id ? (
                  <input
                    type="text"
                    name="title"
                    value={editingMovie.title}
                    onChange={handleEditInputChange}
                    className="admin-movie-input"
                  />
                ) : (
                  movie.title
                )}
              </td>
              <td className="admin-movie-table-cell">
                {editingMovie?.id === movie.id ? (
                  <input
                    type="text"
                    name="genre"
                    value={editingMovie.genre}
                    onChange={handleEditInputChange}
                    className="admin-movie-input"
                  />
                ) : (
                  movie.genre
                )}
              </td>
              <td className="admin-movie-table-cell">
                {editingMovie?.id === movie.id ? (
                  <input
                    type="text"
                    name="director"
                    value={editingMovie.director}
                    onChange={handleEditInputChange}
                    className="admin-movie-input"
                  />
                ) : (
                  movie.director
                )}
              </td>
              <td className="admin-movie-table-cell">
                {editingMovie?.id === movie.id ? (
                  <input
                    type="text"
                    name="duration"
                    value={editingMovie.duration}
                    onChange={handleEditInputChange}
                    className="admin-movie-input"
                  />
                ) : (
                  movie.duration
                )}
              </td>
              <td className="admin-movie-table-cell">
                {editingMovie?.id === movie.id ? (
                  <button onClick={() => updateMovie(movie.id)} className="admin-movie-button">Save</button>
                ) : (
                  <button onClick={() => startEditing(movie)} className="admin-movie-button">Edit</button>
                )}
                <button onClick={() => deleteMovie(movie.id)} className="admin-movie-button">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Add New Movie</h2>
      <form className="admin-movie-form">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={newMovie.title}
          onChange={handleInputChange}
          className="admin-movie-input"
        />
        <input
          type="text"
          name="genre"
          placeholder="Genre"
          value={newMovie.genre}
          onChange={handleInputChange}
          className="admin-movie-input"
        />
        <input
          type="text"
          name="director"
          placeholder="Director"
          value={newMovie.director}
          onChange={handleInputChange}
          className="admin-movie-input"
        />
        <input
          type="text"
          name="duration"
          placeholder="Duration (in minutes)"
          value={newMovie.duration}
          onChange={handleInputChange}
          className="admin-movie-input"
        />
        <button type="button" onClick={addMovie} className="admin-movie-button">Add Movie</button>
      </form>
    </div>
  );
};

export default MovieManagement;
