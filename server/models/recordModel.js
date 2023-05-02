const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const recordSchema = new Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    middle_name: {
      type: String,
      required: false,
    },
    position: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      required: true,
    },
    location: [],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Record', recordSchema);
