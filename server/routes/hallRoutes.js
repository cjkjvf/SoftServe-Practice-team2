const express = require('express');
const router = express.Router();
const {
  getHalls,
  getHallById,
  createHall,
  updateHall,
  deleteHall,
} = require('../controllers/hallController');
const auth = require('../middleware/auth');

router.get('/', getHalls);
router.get('/:id', getHallById);
router.post('/', auth, createHall);
router.put('/:id', auth, updateHall);
router.delete('/:id', auth, deleteHall);

module.exports = router;