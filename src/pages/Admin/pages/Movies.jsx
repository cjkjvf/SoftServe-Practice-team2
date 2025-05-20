import { useState, useEffect } from 'react';
import axios from 'axios';
import './UnifiedStyles.css';

function Movies() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [limit] = useState(10);
  const [form, setForm] = useState({ title: '', brief_description: '' });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchMovies();
  }, [page]);

  const fetchMovies = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/movies?page=${page}&limit=${limit}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setMovies(response.data.movies);
      setTotal(response.data.total);
    } catch (err) {
      console.error('Помилка завантаження фільмів:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`http://localhost:5000/api/movies/${editId}`, form, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
      } else {
        await axios.post('http://localhost:5000/api/movies', form, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
      }
      setForm({ title: '', brief_description: '' });
      setEditId(null);
      fetchMovies();
    } catch (err) {
      console.error('Помилка збереження фільму:', err);
    }
  };

  const handleEdit = (movie) => {
    setForm({ title: movie.title, brief_description: movie.brief_description });
    setEditId(movie._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/movies/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      fetchMovies();
    } catch (err) {
      console.error('Помилка видалення фільму:', err);
    }
  };

  return (
    <div className="container">
      <h2>Управління фільмами</h2>
      <form onSubmit={handleSubmit} className="form">
        <label>Назва</label>
        <input
          type="text"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <label>Короткий опис</label>
        <textarea
          value={form.brief_description}
          onChange={(e) => setForm({ ...form, brief_description: e.target.value })}
          required
        />
        <button type="submit">{editId ? 'Оновити' : 'Додати'}</button>
      </form>
      <table className="table">
        <thead>
          <tr>
            <th>Назва</th>
            <th>Опис</th>
            <th>Актори</th>
            <th>Дії</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie._id}>
              <td>{movie.title}</td>
              <td>{movie.brief_description}</td>
              <td>{movie.cast.map(c => c.name).join(', ')}</td>
              <td>
                <button onClick={() => handleEdit(movie)}>Редагувати</button>
                <button className="delete" onClick={() => handleDelete(movie._id)}>Видалити</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button
          onClick={() => setPage(p => Math.max(p - 1, 1))}
          disabled={page === 1}
        >
          Попередня
        </button>
        <span>Сторінка {page} із {Math.ceil(total / limit)}</span>
        <button
          onClick={() => setPage(p => p + 1)}
          disabled={page >= Math.ceil(total / limit)}
        >
          Наступна
        </button>
      </div>
    </div>
  );
}

export default Movies;