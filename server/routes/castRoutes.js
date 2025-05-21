const express = require('express');
const router = express.Router();
const {
  getCasts,
  getCastById,
  createCast,
  updateCast,
  deleteCast,
} = require('../controllers/castController');
const auth = require('../middleware/auth');

router.get('/', getCasts);
router.get('/:id', getCastById);
router.post('/', auth, createCast);
router.put('/:id', auth, updateCast);
router.delete('/:id', auth, deleteCast);

module.exports = router;