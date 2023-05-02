const Equipment = require('../models/equipmentModel');
const mongoose = require('mongoose');

// GET all equipments
const getEquipments = async (req, res) => {
  const equipments = await Equipment.find({}).sort({ createdAt: -1 });

  res.status(200).json(equipments);
};

// GET a single equipment
const getEquipment = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such equipment' });
  }

  const equipment = await Equipment.findById(id);

  if (!equipment) {
    return res.status(404).json({ error: 'No such equipment' });
  }

  res.status(200).json(equipment);
};

// CREATE new equipment
const createEquipment = async (req, res) => {
  const { name, type, amount, height } = req.body;

  // add doc to db
  try {
    const equipment = await Equipment.create({ name, type, amount, height });
    res.status(200).json(equipment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE a equipment
const deleteEquipment = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such equipment' });
  }

  const equipment = await Equipment.findOneAndDelete({ _id: id });

  if (!equipment) {
    return res.status(404).json({ error: 'No such equipment' });
  }

  res.status(200).json(equipment);
};

// UPDATE a equipment
const updateEquipment = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such equipment' });
  }

  const equipment = await Equipment.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!equipment) {
    return res.status(404).json({ error: 'No such equipment' });
  }

  res.status(200).json(equipment);
};

const updateHeight = async (req, res) => {
  const { id } = req.params;
  const update = { height: Math.floor(Math.random() * 10) };

  try {
    const response = await Equipment.updateOne({ _id: id }, { update });

    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({ error: error });
  }
};

module.exports = {
  getEquipments,
  getEquipment,
  createEquipment,
  deleteEquipment,
  updateEquipment,
  updateHeight,
};
