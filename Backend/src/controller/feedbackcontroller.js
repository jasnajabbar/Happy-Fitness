const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const Feedback=require('../model/feedbackmodel');

exports.userFeedback =async(req,res) => {
  try {
      const {username,rating,description}=req.body;

      if (!username || !rating) {
          return res.status(400).json({message:"Username and rating are required."});
      }

      const newFeedback=new Feedback({username, rating, description});
      await newFeedback.save();

      res.status(200).json({message:"Feedback submitted successfully!"});
  } catch (error) {
      console.error("Feedback Submission Error:",error);
      res.status(500).json({message:"Internal server error"});
  }
};