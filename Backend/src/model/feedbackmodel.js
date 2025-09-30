const mongoose=require('mongoose');
const masterSchema=require('./fitnessmastermodel')

const feedbackSchema=new mongoose.Schema({
    ...masterSchema.obj, 
    username: {type:String,required:true},  
    rating: {type:Number,required:true},  
    description: {type:String}, 
})

module.exports=mongoose.model('Feedback',feedbackSchema)
