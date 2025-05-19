const mongoose = require('mongoose');

const hallSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // Наприклад, "Зал 1"
  cinema: { type: String, required: true }, // Наприклад, "Планета Кіно"
  seats: [[{ type: Number, required: true }]], // Матриця місць (0, 1, 2)
  capacity: { type: Number, required: true }, // Загальна кількість місць
}, { timestamps: true });

hallSchema.index({ name: 1, cinema: 1 });

module.exports = mongoose.model('Hall', hallSchema);