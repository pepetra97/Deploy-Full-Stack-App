const express = require('express');
const mongoose = require('mongoose');
const Reward = require('../models/rewardModel');

const router = express.Router();

//GET all rewards
router.get('/reward', async (req, res) => {
  const rewards = await Reward.find().sort({ createdAt: -1 });

  return res.status(200).json(rewards);
});

//GET a reward
router.get('/reward/:id', async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid) {
    return res.status(404).json(error);
  }

  const reward = await Reward.findById(id);

  if (!reward) {
    return res.status(404), json(error);
  }

  return res.status(200).json(reward);
});

//CREATE new reward
router.post('/reward/add', async (req, res) => {
  const { reward_name, amount, note } = req.body;

  try {
    const reward = await Reward.create({
      reward_name,
      amount,
      note,
    });
    return res.status(200).json(reward);
  } catch (error) {
    return res.status(400).json(error);
  }
});

//UPDATE reward
router.patch('/reward/update/:id', async (req, res) => {
  const { id } = req.params;
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
});

//DELETE reward
router.delete('/reward/delete/:id', async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid) {
    return res.status(404).json(error);
  }

  const reward = await Reward.findByIdAndDelete({ _id: id });

  if (!reward) {
    return res.status(400).json(error);
  }

  return res.status(200).json(reward);
});

module.exports = router;
