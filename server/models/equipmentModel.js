const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const equipmentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    height: { type: Number },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Equipments', equipmentSchema);
