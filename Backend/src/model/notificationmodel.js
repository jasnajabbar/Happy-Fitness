const mongoose=require('mongoose');
const masterSchema=require('./fitnessmastermodel')

const notificationSchema=new mongoose.Schema({
    ...masterSchema.obj,
    recipientId:{type:Number,required:true},
    message:{type:String,required:true},
})

module.exports=mongoose.model('Notification',notificationSchema)
