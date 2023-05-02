const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const locationSchema = new Schema(
  {
    country: { type: String },
    city: { type: String },
  },
  { timeStamps: true }
);

module.exports = mongoose.model('Location', locationSchema);
