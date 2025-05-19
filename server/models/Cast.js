const mongoose = require('mongoose');

const castSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  image: { type: String, required: true },
}, { timestamps: true });

castSchema.index({ name: 1 });

module.exports = mongoose.model('Cast', castSchema);