const mongoose = require('mongoose');
const Reward = require('../models/rewardModel');

//GET all rewards
// const getRewards = async (req, res) => {
//   const rewards = await Reward.find().sort({ createdAt: -1 });

//   return res.status(200).json(rewards);
// };

//GET single reward
const getReward = async (req, res) => {
  const { id } = req.param;

  if (!mongoose.Types.ObjectId.isValid) {
    return res.status(404).json(error);
  }

  const rewards = await Reward.findById(id);

  if (!rewards) {
    return res.status(400).json(error);
  }

  return res.status(200).json(rewards);
};

//POST (Create) new reward
const createRewards = async (req, res) => {
  const { reward_name, amount, note } = req.body;

  //add to db
  try {
    const reward = await Reward.create({
      reward_name,
      amount,
      note,
    });
    return res.status(200).json(reward);
  } catch (error) {
    return res.status(404).json(error);
  }
};

//PATCH (update) reward
const updateRewards = async (req, res) => {
  const { id } = req.param;
  const { reward_name, amount, note } = req.body;

  if (!mongoose.Types.ObjectId.isValid) {
    return res.status(404).json(error);
  }

  const rewardToUpdate = await Reward.findByIdAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!rewardToUpdate) {
    return res.status(400).json(error);
  }

  return res.status(200).json(rewardToUpdate);
};

//DELETE reward
const deleteRewards = async (req, res) => {
  const { id } = req.param;

  if (!mongoose.Types.ObjectId.isValid) {
    return res.status(404).json(error);
  }

  const reward = await Reward.findByIdAndDelete({ _id: id });

  if (!reward) {
    return res.status(400).json(error);
  }

  return res.status(200).json(reward);
};

module.exports = {
  getRewards,
  getReward,
  createRewards,
  updateRewards,
  deleteRewards,
};
