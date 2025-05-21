import { useState, useEffect } from 'react';
import axios from 'axios';
import './UnifiedStyles.css';

function Movies() {
  const [movies, setMovies] = useState([]);
  const [casts, setCasts] = useState([]); // Список акторів
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [limit] = useState(10);
  const [form, setForm] = useState({
    title: '',
    brief_description: '',
    description: '',
    genres: [],
    imageURL: '',
    image: '',
    trailer: '',
    details: {},
    cast: [],
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchMovies();
    fetchCasts();
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

  const fetchCasts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/casts', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      console.log('API response for casts:', response.data); // Log to debug
      setCasts(Array.isArray(response.data) ? response.data : response.data.casts || []);
    } catch (err) {
      console.error('Помилка завантаження акторів:', err);
      setCasts([]); // Fallback to empty array
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        ...form,
        genres: form.genres.split(',').map((genre) => genre.trim()),
        details: form.details ? JSON.parse(form.details) : {},
      };
      if (editId) {
        await axios.put(`http://localhost:5000/api/movies/${editId}`, formData, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
      } else {
        await axios.post('http://localhost:5000/api/movies', formData, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
      }
      setForm({
        title: '',
        brief_description: '',
        description: '',
        genres: [],
        imageURL: '',
        image: '',
        trailer: '',
        details: {},
        cast: [],
      });
      setEditId(null);
      fetchMovies();
    } catch (err) {
      console.error('Помилка збереження фільму:', err);
      alert('Помилка збереження фільму. Перевірте дані.');
    }
  };

  const handleEdit = (movie) => {
    setForm({
      title: movie.title,
      brief_description: movie.brief_description,
      description: movie.description || '',
      genres: movie.genres.join(', '),
      imageURL: movie.imageURL || '',
      image: movie.image || '',
      trailer: movie.trailer || '',
      details: JSON.stringify(movie.details || {}),
      cast: movie.cast.map((c) => c._id),
    });
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
      alert('Помилка видалення фільму.');
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
        <label>Повний опис</label>
        <textarea
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <label>Жанри (через кому)</label>
        <input
          type="text"
          value={form.genres}
          onChange={(e) => setForm({ ...form, genres: e.target.value })}
          placeholder="Напр. Бойовик, Фантастика"
        />
        <label>URL зображення</label>
        <input
          type="text"
          value={form.imageURL}
          onChange={(e) => setForm({ ...form, imageURL: e.target.value })}
        />
        <label>Шлях до зображення</label>
        <input
          type="text"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
        />
        <label>URL трейлера</label>
        <input
          type="text"
          value={form.trailer}
          onChange={(e) => setForm({ ...form, trailer: e.target.value })}
        />
        <label>Деталі (JSON формат)</label>
        <textarea
          value={form.details}
          onChange={(e) => setForm({ ...form, details: e.target.value })}
          placeholder='Напр. {"director": "John Doe", "duration": 120}'
        />
        <label>Актори</label>
        <select
          multiple
          value={form.cast}
          onChange={(e) =>
            setForm({ ...form, cast: Array.from(e.target.selectedOptions, (option) => option.value) })
          }
        >
          {Array.isArray(casts) && casts.length > 0 ? (
            casts.map((cast) => (
              <option key={cast._id} value={cast._id}>
                {cast.name} {cast.surname || ''}
              </option>
            ))
          ) : (
            <option disabled>Немає доступних акторів</option>
          )}
        </select>
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
              <td>{movie.cast.map((c) => `${c.name} ${c.surname || ''}`).join(', ')}</td>
              <td>
                <button onClick={() => handleEdit(movie)}>Редагувати</button>
                <button className="delete" onClick={() => handleDelete(movie._id)}>
                  Видалити
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
        >
          Попередня
        </button>
        <span>Сторінка {page} із {Math.ceil(total / limit)}</span>
        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={page >= Math.ceil(total / limit)}
        >
          Наступна
        </button>
      </div>
    </div>
  );
}

export default Movies;