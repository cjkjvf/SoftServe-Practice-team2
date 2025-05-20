const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const Admin = require('./models/Admin');

dotenv.config();

const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

// Routes
const movieRoutes = require('./routes/movieRoutes');
const castRoutes = require('./routes/castRoutes');
const hallRoutes = require('./routes/hallRoutes');
const screeningRoutes = require('./routes/screeningRoutes');
const adminRoutes = require('./routes/adminRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

app.use('/api/movies', movieRoutes);
app.use('/api/casts', castRoutes);
app.use('/api/halls', hallRoutes);
app.use('/api/screenings', screeningRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api', bookingRoutes);

// Підключення до MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});