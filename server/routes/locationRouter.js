const express = require('express');
const Locations = require('../models/locationModel');

const router = express.Router();

//GET all locations
router.get('/locations', async (req, res) => {
  const locations = await Locations.find({});

  if (!locations) {
    return res.status(400).json('Something went wrong');
  }

  return res.status(200).json(locations);
});

module.exports = router;
