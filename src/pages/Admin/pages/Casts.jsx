import { useState, useEffect } from 'react';
import axios from 'axios';
import './Casts.css';

function Casts() {
  const [casts, setCasts] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [limit] = useState(10);
  const [form, setForm] = useState({ name: '', role: '', image: '' });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchCasts();
  }, [page]);

  const fetchCasts = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/casts?page=${page}&limit=${limit}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setCasts(response.data.casts);
      setTotal(response.data.total);
    } catch (err) {
      console.error('Помилка завантаження акторів:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`http://localhost:5000/api/casts/${editId}`, form, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
      } else {
        await axios.post('http://localhost:5000/api/casts', form, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
      }
      setForm({ name: '', role: '', image: '' });
      setEditId(null);
      fetchCasts();
    } catch (err) {
      console.error('Помилка збереження актора:', err);
    }
  };

  const handleEdit = (cast) => {
    setForm({ name: cast.name, role: cast.role, image: cast.image });
    setEditId(cast._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/casts/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      fetchCasts();
    } catch (err) {
      console.error('Помилка видалення актора:', err);
    }
  };

  return (
    <div className="container casts-container">
      <h2>Управління акторами</h2>
      <form onSubmit={handleSubmit} className="casts-form">
        <label>Ім'я</label>
        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <label>Роль</label>
        <input
          type="text"
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
          required
        />
        <label>Зображення</label>
        <input
          type="text"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
          required
        />
        <button type="submit">{editId ? 'Оновити' : 'Додати'}</button>
      </form>
      <table className="casts-table">
        <thead>
          <tr>
            <th>Ім'я</th>
            <th>Роль</th>
            <th>Зображення</th>
            <th>Дії</th>
          </tr>
        </thead>
        <tbody>
          {casts.map((cast) => (
            <tr key={cast._id}>
              <td>{cast.name}</td>
              <td>{cast.role}</td>
              <td>{cast.image}</td>
              <td>
                <button onClick={() => handleEdit(cast)}>Редагувати</button>
                <button className="delete" onClick={() => handleDelete(cast._id)}>Видалити</button>
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

export default Casts;