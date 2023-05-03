const Equipment = require('../models/equipmentModel');
const mongoose = require('mongoose');
const express = require('express');

const router = express.Router();

// GET all records
router.get('/equipment', async (req, res) => {
  const equipments = await Equipment.find({}).sort({ createdAt: -1 });

  res.status(200).json(equipments);
});

// GET single records
router.get('/equipment/:id', async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such equipment' });
  }

  const equipment = await Equipment.findById(id);

  if (!equipment) {
    return res.status(404).json({ error: 'No such equipment' });
  }

  res.status(200).json(equipment);
});

// POST a new record
router.post('/equipment/add', async (req, res) => {
  const { name, type, amount, height } = req.body;

  // add doc to db
  try {
    const equipment = await Equipment.create({ name, type, amount, height });
    res.status(200).json(equipment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE a record
router.delete('/equipment/delete/:id', async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such equipment' });
  }

  const equipment = await Equipment.findOneAndDelete({ _id: id });

  if (!equipment) {
    return res.status(404).json({ error: 'No such equipment' });
  }

  res.status(200).json(equipment);
});

// UPDATE a record
router.patch('/equipment/update/:id', async (req, res) => {
  const { id } = req.params;
  const { equipment_name, type, amount } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such equipment' });
  }

  const equipmentToUpdate = await Equipment.findByIdAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  )

  if (!equipmentToUpdate) {
    return res.status(400).json(error);
  }

  return res.status(200).json(equipmentToUpdate);
});


module.exports = router;
