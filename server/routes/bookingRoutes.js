const express = require('express');
const router = express.Router();
const Screening = require('../models/Screening');

// Дебагування імпорту
console.log('Screening model:', Screening);

router.get('/screenings/:screeningId/seats', async (req, res) => {
  const { screeningId } = req.params;
  const { time } = req.query;
  try {
    const screening = await Screening.findById(screeningId);
    if (!screening) {
      return res.status(404).json({ error: 'Сеанс не знайдено' });
    }
    const timeSlot = screening.times.find(t => t.time === time);
    if (!timeSlot) {
      return res.status(404).json({ error: 'Час сеансу не знайдено' });
    }
    res.json({
      occupiedSeats: timeSlot.occupiedSeats || [],
      seatPrices: timeSlot.seatPrices || []
    });
  } catch (err) {
    console.error('Помилка в /seats:', err);
    res.status(500).json({ error: 'Помилка сервера' });
  }
});

router.post('/bookings', async (req, res) => {
  const { screeningId, time, seats } = req.body;
  try {
    const screening = await Screening.findById(screeningId);
    if (!screening) {
      return res.status(404).json({ error: 'Сеанс не знайдено' });
    }
    const timeSlot = screening.times.find(t => t.time === time);
    if (!timeSlot) {
      return res.status(404).json({ error: 'Час сеансу не знайдено' });
    }
    timeSlot.occupiedSeats = [
      ...(timeSlot.occupiedSeats || []),
      ...seats.map(s => ({ row: s.row, number: s.number }))
    ];
    await screening.save();
    res.json({ success: true });
  } catch (err) {
    console.error('Помилка в /bookings:', err);
    res.status(500).json({ error: 'Помилка збереження бронювання' });
  }
});

module.exports = router;