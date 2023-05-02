const Record = require('../models/recordModel');
const mongoose = require('mongoose');

// GET all Records
const getRecords = async (req, res) => {
  const records = await Record.find({}).sort({ createdAt: -1 });

  res.status(200).json(records);
};

// GET a single Record
const getRecord = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such record' });
  }

  const record = await Record.findById(id);

  if (!record) {
    return res.status(404).json({ error: 'No such record' });
  }

  res.status(200).json(record);
};

//CREATE new record
const createRecord = async (req, res) => {
  const { first_name, last_name, middle_name, position, level, location } = req.body;

  // add doc to db
  try {
    const record = await Record.create({
      first_name,
      last_name,
      middle_name,
      position,
      level,
      location,
    });
    res.status(200).json(record);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE a record
const deleteRecord = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such record' });
  }

  const record = await Record.findOneAndDelete({ _id: id });

  if (!record) {
    return res.status(404).json({ error: 'No such record' });
  }

  res.status(200).json(record);
};

// UPDATE a Record
const updateRecord = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such record' });
  }

  const record = await Record.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!record) {
    return res.status(404).json({ error: 'No such record' });
  }

  res.status(200).json(record);
};

const filteredRecords = async (req, res) => {
  const filteredEmployees = await Record.find({
    position: req.params.positions,
    level: req.params.level,
  });
  return res.status(200).json(filteredEmployees);
};

module.exports = {
  getRecords,
  getRecord,
  createRecord,
  deleteRecord,
  updateRecord,
  filteredRecords,
};
