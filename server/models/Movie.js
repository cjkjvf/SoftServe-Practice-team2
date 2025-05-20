const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  brief_description: { type: String, required: true },
  description: { type: String, required: true },
  genres: [{ type: String, required: true }],
  imageURL: { type: String, required: true, match: /^https?:\/\/.+/ },
  image: { type: String, required: true },
  trailer: { type: String, required: true, match: /^https?:\/\/.+/ },
  details: {
    language: { type: String, required: true },
    release_date: { type: Date, required: true },
    country: { type: String, required: true },
    rating: { type: String, required: true },
    year: { type: Number, required: true },
    duration_minutes: { type: Number, required: true },
    display_technologies: [{ type: String, required: true }],
    age_restriction: { type: String, required: true },
  },
  cast: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Cast' }],
}, { timestamps: true });

movieSchema.index({ title: 1 });
movieSchema.index({ 'details.year': 1 });
movieSchema.index({ 'details.release_date': 1 });

module.exports = mongoose.model('Movie', movieSchema);