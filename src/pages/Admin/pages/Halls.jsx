import { useState, useEffect } from 'react';
import axios from 'axios';
import './Halls.css';

function Halls() {
  const [halls, setHalls] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [limit] = useState(10);
  const [form, setForm] = useState({ name: '', cinema: '', capacity: '' });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchHalls();
  }, [page]);

  const fetchHalls = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/halls?page=${page}&limit=${limit}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setHalls(response.data.halls);
      setTotal(response.data.total);
    } catch (err) {
      console.error('Помилка завантаження залів:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = { ...form, capacity: parseInt(form.capacity) };
      if (editId) {
        await axios.put(`http://localhost:5000/api/halls/${editId}`, data, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
      } else {
        await axios.post('http://localhost:5000/api/halls', data, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
      }
      setForm({ name: '', cinema: '', capacity: '' });
      setEditId(null);
      fetchHalls();
    } catch (err) {
      console.error('Помилка збереження залу:', err);
    }
  };

  const handleEdit = (hall) => {
    setForm({ name: hall.name, cinema: hall.cinema, capacity: hall.capacity.toString() });
    setEditId(hall._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/halls/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      fetchHalls();
    } catch (err) {
      console.error('Помилка видалення залу:', err);
    }
  };

  return (
    <div className="container halls-container">
      <h2>Управління залами</h2>
      <form onSubmit={handleSubmit} className="halls-form">
        <label>Назва</label>
        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <label>Кінотеатр</label>
        <input
          type="text"
          value={form.cinema}
          onChange={(e) => setForm({ ...form, cinema: e.target.value })}
          required
        />
        <label>Місткість</label>
        <input
          type="number"
          value={form.capacity}
          onChange={(e) => setForm({ ...form, capacity: e.target.value })}
          required
        />
        <button type="submit">{editId ? 'Оновити' : 'Додати'}</button>
      </form>
      <table className="halls-table">
        <thead>
          <tr>
            <th>Назва</th>
            <th>Кінотеатр</th>
            <th>Місткість</th>
            <th>Дії</th>
          </tr>
        </thead>
        <tbody>
          {halls.map((hall) => (
            <tr key={hall._id}>
              <td>{hall.name}</td>
              <td>{hall.cinema}</td>
              <td>{hall.capacity}</td>
              <td>
                <button onClick={() => handleEdit(hall)}>Редагувати</button>
                <button className="delete" onClick={() => handleDelete(hall._id)}>Видалити</button>
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

export default Halls;