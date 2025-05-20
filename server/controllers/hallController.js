const Hall = require('../models/Hall');

const getHalls = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const halls = await Hall.find()
      .skip((page - 1) * limit)
      .limit(limit);
    const total = await Hall.countDocuments();
    res.json({ halls, total, page, limit });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getHallById = async (req, res) => {
  try {
    const hall = await Hall.findById(req.params.id);
    if (!hall) return res.status(404).json({ error: 'Hall not found' });
    res.json(hall);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createHall = async (req, res) => {
  try {
    const hall = new Hall(req.body);
    await hall.save();
    res.status(201).json(hall);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const updateHall = async (req, res) => {
  try {
    const hall = await Hall.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!hall) return res.status(404).json({ error: 'Hall not found' });
    res.json(hall);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteHall = async (req, res) => {
  try {
    const hall = await Hall.findByIdAndDelete(req.params.id);
    if (!hall) return res.status(404).json({ error: 'Hall not found' });
    res.json({ message: 'Hall deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getHalls,
  getHallById,
  createHall,
  updateHall,
  deleteHall,
};