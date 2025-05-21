const mongoose = require('mongoose');

const hallSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, 
  cinema: { type: String, required: true },
  seats: [[{ type: Number, required: true }]],
  capacity: { type: Number, required: true }, 
}, { timestamps: true });

hallSchema.index({ name: 1, cinema: 1 });

module.exports = mongoose.model('Hall', hallSchema);