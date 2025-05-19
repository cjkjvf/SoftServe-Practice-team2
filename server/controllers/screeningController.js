const Screening = require('../models/Screening');

const getScreenings = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const screenings = await Screening.find()
      .populate('movie', 'title brief_description imageURL')
      .populate('hall', 'name cinema seats')
      .skip((page - 1) * limit)
      .limit(limit);
    const total = await Screening.countDocuments();
    res.json({ screenings, total, page, limit });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getScreeningById = async (req, res) => {
  try {
    const screening = await Screening.findById(req.params.id)
      .populate('movie', 'title brief_description imageURL details')
      .populate('hall', 'name cinema seats');
    if (!screening) return res.status(404).json({ error: 'Screening not found' });
    res.json(screening);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createScreening = async (req, res) => {
  try {
    const screening = new Screening(req.body);
    await screening.save();
    res.status(201).json(screening);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const updateScreening = async (req, res) => {
  try {
    const screening = await Screening.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!screening) return res.status(404).json({ error: 'Screening not found' });
    res.json(screening);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteScreening = async (req, res) => {
  try {
    const screening = await Screening.findByIdAndDelete(req.params.id);
    if (!screening) return res.status(404).json({ error: 'Screening not found' });
    res.json({ message: 'Screening deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getScreenings,
  getScreeningById,
  createScreening,
  updateScreening,
  deleteScreening,
};