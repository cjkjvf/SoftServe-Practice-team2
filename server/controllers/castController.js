const Cast = require('../models/Cast');

const getCasts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const casts = await Cast.find()
      .skip((page - 1) * limit)
      .limit(limit);
    const total = await Cast.countDocuments();
    res.json({ casts, total, page, limit });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getCastById = async (req, res) => {
  try {
    const cast = await Cast.findById(req.params.id);
    if (!cast) return res.status(404).json({ error: 'Cast not found' });
    res.json(cast);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createCast = async (req, res) => {
  try {
    const cast = new Cast(req.body);
    await cast.save();
    res.status(201).json(cast);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const updateCast = async (req, res) => {
  try {
    const cast = await Cast.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!cast) return res.status(404).json({ error: 'Cast not found' });
    res.json(cast);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteCast = async (req, res) => {
  try {
    const cast = await Cast.findByIdAndDelete(req.params.id);
    if (!cast) return res.status(404).json({ error: 'Cast not found' });
    res.json({ message: 'Cast deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getCasts,
  getCastById,
  createCast,
  updateCast,
  deleteCast,
};