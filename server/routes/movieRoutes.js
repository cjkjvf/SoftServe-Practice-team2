const express = require('express');
const router = express.Router();
const {
  getMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
} = require('../controllers/movieController');
const auth = require('../middleware/auth');

router.get('/', getMovies);
router.get('/:id', getMovieById);
router.post('/', auth, createMovie);
router.put('/:id', auth, updateMovie);
router.delete('/:id', auth, deleteMovie);

module.exports = router;