const mongoose = require('mongoose');

const screeningSchema = new mongoose.Schema({
  movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
  cinema: { type: String, required: true },
  hall: { type: mongoose.Schema.Types.ObjectId, ref: 'Hall', required: true },
  date: { type: Date, required: true },
  times: [{
    time: { type: String, required: true }, // Наприклад, "14:30"
    available_formats: [{ type: String, required: true }], // Наприклад, ["2D", "3D"]
    occupiedSeats: [{
      row: Number,
      number: Number
    }],
    seatPrices: [{
      type: { type: String, enum: ['GOOD', 'SUPER LUX'], required: true },
      price: { type: Number, required: true }
    }],
    _id: mongoose.Schema.Types.ObjectId
  }],
}, { timestamps: true });

screeningSchema.index({ movie: 1, date: 1 });
screeningSchema.index({ cinema: 1 });

module.exports = mongoose.model('Screening', screeningSchema);