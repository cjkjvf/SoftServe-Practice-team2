import { useState, useEffect } from 'react';
import axios from 'axios';
import './UnifiedStyles.css';

function Screenings() {
  const [screenings, setScreenings] = useState([]);
  const [movies, setMovies] = useState([]);
  const [halls, setHalls] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [limit] = useState(10);
  const [form, setForm] = useState({
    movie: '',
    cinema: '',
    hall: '',
    date: '',
    times: [{ time: '', available_formats: ['2D'] }],
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchScreenings();
    fetchMovies();
    fetchHalls();
  }, [page]);

  const fetchScreenings = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/screenings?page=${page}&limit=${limit}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setScreenings(response.data.screenings);
      setTotal(response.data.total);
    } catch (err) {
      console.error('Помилка завантаження сеансів:', err);
    }
  };

  const fetchMovies = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/movies', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setMovies(response.data.movies);
    } catch (err) {
      console.error('Помилка завантаження фільмів:', err);
    }
  };

  const fetchHalls = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/halls', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setHalls(response.data.halls);
    } catch (err) {
      console.error('Помилка завантаження залів:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        ...form,
        date: new Date(form.date).toISOString(),
        times: form.times.map(t => ({
          time: t.time,
          available_formats: t.available_formats,
        })),
      };
      if (editId) {
        await axios.put(`http://localhost:5000/api/screenings/${editId}`, data, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
      } else {
        await axios.post('http://localhost:5000/api/screenings', data, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
      }
      setForm({
        movie: '',
        cinema: '',
        hall: '',
        date: '',
        times: [{ time: '', available_formats: ['2D'] }],
      });
      setEditId(null);
      fetchScreenings();
    } catch (err) {
      console.error('Помилка збереження сеансу:', err);
    }
  };

  const handleEdit = (screening) => {
    setForm({
      movie: screening.movie._id,
      cinema: screening.cinema,
      hall: screening.hall._id,
      date: new Date(screening.date).toISOString().split('T')[0],
      times: screening.times,
    });
    setEditId(screening._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/screenings/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      fetchScreenings();
    } catch (err) {
      console.error('Помилка видалення сеансу:', err);
    }
  };

  const handleTimeChange = (index, field, value) => {
    const newTimes = [...form.times];
    newTimes[index] = { ...newTimes[index], [field]: value };
    setForm({ ...form, times: newTimes });
  };

  const addTime = () => {
    setForm({
      ...form,
      times: [...form.times, { time: '', available_formats: ['2D'] }],
    });
  };

  return (
    <div className="container">
      <h2>Управління сеансами</h2>
      <form onSubmit={handleSubmit} className="form">
        <label>Фільм</label>
        <select
          value={form.movie}
          onChange={(e) => setForm({ ...form, movie: e.target.value })}
          required
        >
          <option value="">Виберіть фільм</option>
          {movies.map((movie) => (
            <option key={movie._id} value={movie._id}>{movie.title}</option>
          ))}
        </select>
        <label>Кінотеатр</label>
        <input
          type="text"
          value={form.cinema}
          onChange={(e) => setForm({ ...form, cinema: e.target.value })}
          required
        />
        <label>Зал</label>
        <select
          value={form.hall}
          onChange={(e) => setForm({ ...form, hall: e.target.value })}
          required
        >
          <option value="">Виберіть зал</option>
          {halls.map((hall) => (
            <option key={hall._id} value={hall._id}>{hall.name}</option>
          ))}
        </select>
        <label>Дата</label>
        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          required
        />
        <label>Час і формати</label>
        {form.times.map((time, index) => (
          <div key={index} className="time-input">
            <input
              type="time"
              value={time.time}
              onChange={(e) => handleTimeChange(index, 'time', e.target.value)}
              required
            />
            <input
              type="text"
              value={time.available_formats.join(',')}
              onChange={(e) => handleTimeChange(index, 'available_formats', e.target.value.split(','))}
              placeholder="Формати (наприклад, 2D,3D)"
            />
          </div>
        ))}
        <button type="button" onClick={addTime}>Додати час</button>
        <button type="submit">{editId ? 'Оновити' : 'Додати'}</button>
      </form>
      <table className="table">
        <thead>
          <tr>
            <th>Фільм</th>
            <th>Кінотеатр</th>
            <th>Зал</th>
            <th>Дата</th>
            <th>Час</th>
            <th>Дії</th>
          </tr>
        </thead>
        <tbody>
          {screenings.map((screening) => (
            <tr key={screening._id}>
              <td>{screening.movie.title}</td>
              <td>{screening.cinema}</td>
              <td>{screening.hall.name}</td>
              <td>{new Date(screening.date).toLocaleDateString()}</td>
              <td>{screening.times.map(t => t.time).join(', ')}</td>
              <td>
                <button onClick={() => handleEdit(screening)}>Редагувати</button>
                <button className="delete" onClick={() => handleDelete(screening._id)}>Видалити</button>
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

export default Screenings;