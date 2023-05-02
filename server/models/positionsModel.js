const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const positionsSchema = new Schema({
  name: { type: String },
  salary: { type: Number },
});

module.exports = mongoose.model('Positions', positionsSchema);
