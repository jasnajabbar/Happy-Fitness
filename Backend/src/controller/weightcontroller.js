const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const {User}=require('../model/usermodel');
const WeightLog=require('../model/weightmodel')

exports.weightLog=async(req,res)=>{
    try {
        const {username,weight,progress}=req.body;
        const newWeightLog=new WeightLog({
            username:username,
            weight:weight,
            progress:progress ||0,
        })
        await newWeightLog.save();

        res.status(200).json({
            success:true,
            message:'Weight log added successfully!',
            data: newWeightLog
        });
    } catch (error) {
        console.error('Error adding weight log:',error.message)
        return res.status(500).json({message:'Internal server error'});
    }
}

exports.setGoals=async(req,res)=>{
    try{
    const {username,goal,targetWeight} = req.body;
    const user = await User.findOne({ username });

    if (!user) {
        return res.status(404).json({success:false, message:'User not found'});
    }
    user.goal =goal;
    user.targetWeight =targetWeight;

    await user.save();
    
    res.status(200).json({
        success:true,
        message:'Goal set successfully',
        data:user
    });
    }catch (error) {
        console.error('Error setting goals:',error.message)
        return res.status(500).json({message:'Internal server error'});
    }
}

exports.updateGoals =async(req,res) => {
    try {
        const {username} =req.params;
        const {goal,targetWeight} =req.body;

        const user = await User.findOne({username});

        if (!user) {
            return res.status(404).json({success:false,message:'User not found'});
        }

        user.goal =goal ||user.goal;  // update if provided
        user.targetWeight = targetWeight ||user.targetWeight;  // update if provided

        await user.save();
        res.status(200).json({
            success:true,
            message:'Goals updated successfully',
            data: user,
        });
    } catch(error) {
        console.error('Error updating weight goals:',error.message);
        res.status(500).json({message:'Internal server error' });
    }
};

exports.weightProgress = async(req,res) => {
    try {
        const {username} =req.params;
        const user = await User.findOne({username});

        if (!user) {
            return res.status(404).json({success: false,message: 'User not found'});
        }

        const latestWeightLog = await WeightLog.findOne({username:username}).sort({date: -1});

        if (!latestWeightLog) {
            return res.status(404).json({success:false,message:'No weight logs found'});
        }

        const progress = ((user.startweight - latestWeightLog.weight) / user.startweight) *100;  // Calculate progress in percentage
        res.status(200).json({
            success:true,
            message:'Weight progress fetched successfully',
            data: {progress: progress.toFixed(2)},  // Return progress in percentage
        });
    } catch (error) {
        console.error('Error fetching weight progress:',error.message);
        res.status(500).json({ message:'Internal server error' });
    }
};


exports.weightHistory = async(req,res) => {
    try {
        const {username} =req.params;
        const weightLogs =await WeightLog.find({username});

        if (!weightLogs.length) {
            return res.status(404).json({
                success: false,
                message: 'Weight Log not found',
            });
        }

        res.status(200).json({
            success:true,
            data:weightLogs,
        });
    } catch (error) {
        console.error('Error fetching weight history:',error.message);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

exports.weightAnalysis=async(req,res)=>{
    try {
        const{username}=req.params;
        const weightLogs=await WeightLog.find({username})

        if(!weightLogs){
            return res.status(404).json({success:false,message:'No weight log for this user'})
        }
         // Calculate the analysis data
         const analysis = {
            totalLogs:weightLogs.length,
            startWeight:weightLogs[0].weight,  // first weight
            currentWeight:weightLogs[weightLogs.length-1].weight,  // lastest recorded weight
            weightChange:weightLogs[weightLogs.length-1].weight - weightLogs[0].weight,
            progress:weightLogs[weightLogs.length-1].progress,  // Assuming progress is stored in weight log
        };
        res.status(200).json({
            success:true,
            analysis,
        });
    } catch (error) {
        console.error('Error in weight analysis:',error.message);
        return res.status(500).json({message:'Internal server error'});
    }
}