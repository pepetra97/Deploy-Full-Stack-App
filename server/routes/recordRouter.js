const express = require('express');
const {
  getRecords,
  getRecord,
  createRecord,
  deleteRecord,
  updateRecord,
  filteredRecords,
} = require('../controllers/recordController');

const router = express.Router();

// GET all records
router.get('/record', getRecords);

// GET single records
router.get('/record/:id', getRecord);

// POST a new record
router.post('/record/add', createRecord);

// DELETE a record
router.delete('/record/delete/:id', deleteRecord);

// UPDATE a record
router.patch('/record/update/:id', updateRecord);

//Filter
router.get('/record/filtered/:positions/:level', filteredRecords);

module.exports = router;
