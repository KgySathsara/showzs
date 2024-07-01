import React, { useState, useEffect } from 'react';
import './movieManagement.css';

const MovieManagement = () => {
  const [movies, setMovies] = useState([]);
  const [newMovie, setNewMovie] = useState({ title: '', genre: '', director: '', duration: '', picture: null });
  const [editingMovie, setEditingMovie] = useState(null);
  const [movieToDelete, setMovieToDelete] = useState('');

  useEffect(() => {
    // Fetch movies from the server
    fetch('/api/movies')
      .then(response => response.json())
      .then(data => setMovies(data))
      .catch(error => console.error('Error fetching movies:', error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMovie({ ...newMovie, [name]: value });
  };

  const handleFileChange = (e) => {
    setNewMovie({ ...newMovie, picture: e.target.files[0] });
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditingMovie({ ...editingMovie, [name]: value });
  };

  const handleEditFileChange = (e) => {
    setEditingMovie({ ...editingMovie, picture: e.target.files[0] });
  };

  const addMovie = () => {
    const formData = new FormData();
    for (const key in newMovie) {
      formData.append(key, newMovie[key]);
    }

    fetch('/api/movies', {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        setMovies([...movies, data]);
        setNewMovie({ title: '', genre: '', director: '', duration: '', picture: null }); // Clear form after submission
      })
      .catch(error => console.error('Error adding movie:', error));
  };

  const updateMovie = (id) => {
    const formData = new FormData();
    for (const key in editingMovie) {
      formData.append(key, editingMovie[key]);
    }

    fetch(`/api/movies/${id}`, {
      method: 'PUT',
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        setMovies(movies.map(movie => movie.id === id ? data : movie));
        setEditingMovie(null);
      })
      .catch(error => console.error('Error updating movie:', error));
  };

  const deleteMovie = () => {
    fetch(`/api/movies/${parseInt(movieToDelete)}`, {
      method: 'DELETE'
    })
      .then(() => setMovies(movies.filter(movie => movie.id !== parseInt(movieToDelete))))
      .catch(error => console.error('Error deleting movie:', error));
    setMovieToDelete('');
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
            <th className="admin-movie-table-header">Picture</th>
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
                  <input
                    type="file"
                    name="picture"
                    onChange={handleEditFileChange}
                    className="admin-movie-input"
                  />
                ) : (
                  <img src={movie.pictureUrl} alt={movie.title} className="admin-movie-picture" />
                )}
              </td>
              <td className="admin-movie-table-cell">
                {editingMovie?.id === movie.id ? (
                  <button onClick={() => updateMovie(movie.id)} className="admin-movie-button">Save</button>
                ) : (
                  <button onClick={() => startEditing(movie)} className="admin-movie-button">Edit</button>
                )}
                <button onClick={() => setMovieToDelete(movie.id)} className="admin-movie-button">Delete</button>
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
        <input
          type="file"
          name="picture"
          onChange={handleFileChange}
          className="admin-movie-input"
        />
        <button type="button" onClick={addMovie} className="admin-movie-button">Add Movie</button>
      </form>

      <h2>Update Movie</h2>
      {editingMovie && (
        <form className="admin-movie-form">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={editingMovie.title}
            onChange={handleEditInputChange}
            className="admin-movie-input"
          />
          <input
            type="text"
            name="genre"
            placeholder="Genre"
            value={editingMovie.genre}
            onChange={handleEditInputChange}
            className="admin-movie-input"
          />
          <input
            type="text"
            name="director"
            placeholder="Director"
            value={editingMovie.director}
            onChange={handleEditInputChange}
            className="admin-movie-input"
          />
          <input
            type="text"
            name="duration"
            placeholder="Duration (in minutes)"
            value={editingMovie.duration}
            onChange={handleEditInputChange}
            className="admin-movie-input"
          />
          <input
            type="file"
            name="picture"
            onChange={handleEditFileChange}
            className="admin-movie-input"
          />
          <button type="button" onClick={() => updateMovie(editingMovie.id)} className="admin-movie-button">Update Movie</button>
        </form>
      )}

      <h2>Delete Movie</h2>
      <form className="admin-movie-form">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={movieToDelete}
          onChange={(e) => setMovieToDelete(e.target.value)}
          className="admin-movie-input"
        />
        <button type="button" onClick={deleteMovie} className="admin-movie-button">Delete Movie</button>
      </form>
    </div>
  );
};

export default MovieManagement;
