const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const {User}=require('../model/usermodel');
const Trainer=require('../model/trainermodel')
const {Admin}=require('../model/adminmodel')


exports.updateUser=async(req,res)=>{
    try {
        const {username}=req.params;
        const {email,password,weight,goal}=req.body;

        let hashedPassword;
        if(password){
            hashedPassword=await bcrypt.hash(password,10);
        }
        const updateData={email,weight,goal};

        if(password) updateData.password=hashedPassword;

        const updateUserData=await User.findOneAndUpdate(
            {username:username},
            {$set:updateData},
            {new:true,runValidators:true}
            );
            // {new:true,runValidators:true}//new:true updated document is returned, 
            //runValidators:Mongoose apply the model's validation to the updated fields before updating the document
        if(!updateUserData){
            return res.status(404).json({
                success:false,
                message:"Client not found"
            })
        }
        res.status(200).json({
            success:true,
            date:updateUserData
        })
    } catch (error) {
        console.error('Error in updating user: ',error.message)
        return res.status(500).json({message:'Internale server error'});
    }
}

exports.updateTrainer=async(req,res)=>{
    try {
        const {id}=req.params;
        const {email,password,assignedClient}=req.body;
        let hashedPassword;
        if(password){
            hashedPassword=await bcrypt.hash(password,10);
        }
        const updateData={email,password,assignedClient};

        if(password) updateData.password=hashedPassword;

        const updateUserData=await Trainer.findOneAndUpdate(
            {_id:id},
            {$set:updateData},
            {new:true,runValidators:true}
            );
            if(!updateUserData){
                return res.status(404).json({
                    success:false,
                    message:"Trainer not found"
                })
            }
            res.status(200).json({
                success:true,
                date:updateUserData
            })
    } catch (error) {
        console.error('Error in updating user: ',error.message)
        return res.status(500).json({message:'Internale server error'});
    }
}