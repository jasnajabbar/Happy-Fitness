const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const {User}=require('../model/usermodel');
const Trainer=require('../model/trainermodel')
const {Admin}=require('../model/adminmodel')

exports.listAllUser=async(req,res)=>{
    try {
        const clients =await User.find({usertype:'client'});
        if(!clients.length){
            return res.status(404).json({success:false,message:"No clients found"})
        }
        res.status(200).json({success:true,data:clients})
    } catch (error) {
        console.error('Error fetching clients:',error.message);
        res.status(500).json({message: "Internal server error"});
    }
}

exports.listAllTrainer=async(req,res)=>{
    try {
        const trainers = await Trainer.find({usertype:'trainer'});
        if(!trainers.length){
            return res.status(404).json({success:false,message:"No trainer found"})
        }
        res.status(200).json({success:true,data:trainers})
    } catch (error) {
        console.error('Error fetching trainers:',error.message);
        res.status(500).json({ message: "Internal server error"});
    }
}