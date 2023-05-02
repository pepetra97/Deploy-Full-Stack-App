const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const rewardSchema = new Schema(
  {
    reward_name: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    note: {
      type: String,
      required: false,
    },
  },
  { Timestamp: true }
);

module.exports = mongoose.model('Reward', rewardSchema);
