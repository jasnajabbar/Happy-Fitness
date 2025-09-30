const Trainer = require('../model/trainermodel'); // your trainer schema

// Fetch all trainers
const getAllTrainers = async (req, res) => {
  try {
    const trainers = await Trainer.find({}); // fetch all trainers
    res.status(200).json(trainers);
  } catch (error) {
    console.error("Error fetching trainers:",error);
    res.status(500).json({message:"Server error fetching trainers"});
  }
};

module.exports = {getAllTrainers};
