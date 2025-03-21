const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const {User}=require('../model/usermodel');
const Trainer=require('../model/trainermodel')
const {Admin}=require('../model/adminmodel')


exports.deleteUser=async(req,res)=>{
    try {
        const username=req.params.username;
        const deletedUser=await User.findOneAndDelete({username});
        if(!deletedUser){
            return res.status(404).json({success:false,message:"User not found"})
        }
        res.status(200).json({success:true,message:"User deleted successfully"})
    } catch (error) {
        console.error('Error deleting user:', error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}

exports.deleteTrainer=async(req,res)=>{
    try {
    const username=req.params.username;
    const deletedTrainer=await Trainer.findOneAndDelete({username});
    if(!deletedTrainer){
        return res.status(404).json({success:false,message:"Trainer not found"})
    }
    res.status(200).json({success:true,message:"Trainer deleted successfully"})
    } catch (error) {
    console.error('Error deleting trainer:', error.message);
    res.status(500).json({ message: "Internal server error" });
    }
}