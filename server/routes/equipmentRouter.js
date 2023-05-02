const express = require('express');
const {
  getEquipments,
  getEquipment,
  createEquipment,
  deleteEquipment,
  updateEquipment,
  updateHeight,
} = require('../controllers/equipmentController');

const router = express.Router();

// GET all records
router.get('/equipment', getEquipments);

// GET single records
router.get('/equipment/:id', getEquipment);

// POST a new record
router.post('/equipment/add', createEquipment);

// DELETE a record
router.delete('/equipment/delete/:id', deleteEquipment);

// UPDATE a record
router.patch('/equipment/update/:id', updateEquipment);

//UPDATE height  of equipment
router.patch('/equipment/height/:id', updateHeight);

module.exports = router;
