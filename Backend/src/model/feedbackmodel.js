const mongoose=require('mongoose');
const masterSchema=require('./fitnessmastermodel')

const feedbackSchema=new mongoose.Schema({
    ...masterSchema.obj, 
    clientid:{type:Number,required:true,unique:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
})

module.exports=mongoose.model('Feedback',feedbackSchema)
