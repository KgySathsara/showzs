<<<<<<< HEAD
import React, { useState } from 'react';
=======
import React, { useState, useEffect } from 'react';
>>>>>>> 9701b5a11a82f17d40b7f5e6e1a3f95ea57f9f45
import './movieManagement.css';

const MovieManagement = () => {
  const [newMovie, setNewMovie] = useState({ title: '', genre: '', director: '', duration: '', picture: null });
  const [movieToDelete, setMovieToDelete] = useState('');

<<<<<<< HEAD
=======
  useEffect(() => {
    // Fetch movies from the server
    fetch('/api/movies')
      .then(response => response.json())
      .then(data => setMovies(data))
      .catch(error => console.error('Error fetching movies:', error));
  }, []);

>>>>>>> 9701b5a11a82f17d40b7f5e6e1a3f95ea57f9f45
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMovie({ ...newMovie, [name]: value });
  };

  const handleFileChange = (e) => {
    setNewMovie({ ...newMovie, picture: e.target.files[0] });
  };

<<<<<<< HEAD
=======
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

>>>>>>> 9701b5a11a82f17d40b7f5e6e1a3f95ea57f9f45
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
<<<<<<< HEAD
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
=======
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
>>>>>>> 9701b5a11a82f17d40b7f5e6e1a3f95ea57f9f45

      <h2>Delete Movie</h2>
      <form className="admin-movie-form">
        <input type="text" name="title" placeholder="Title" onChange={(e) => setMovieToDelete(e.target.value)} className="admin-movie-input" />
        <button type="button"  className="admin-movie-button">Delete Movie</button>
      </form>
    </div>
  );
};

export default MovieManagement;
