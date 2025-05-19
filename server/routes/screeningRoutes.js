const express = require('express');
const router = express.Router();
const {
  getScreenings,
  getScreeningById,
  createScreening,
  updateScreening,
  deleteScreening,
} = require('../controllers/screeningController');
const auth = require('../middleware/auth');

router.get('/', getScreenings);
router.get('/:id', getScreeningById);
router.post('/', auth, createScreening);
router.put('/:id', auth, updateScreening);
router.delete('/:id', auth, deleteScreening);

module.exports = router;