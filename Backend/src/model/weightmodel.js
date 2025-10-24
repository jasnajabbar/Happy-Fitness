const mongoose=require('mongoose')
const {User}=require('./usermodel')
const masterSchema=require('./fitnessmastermodel')


const weightLogSchema=new mongoose.Schema({
    ...masterSchema.obj,
    username:{type:String,required:true,ref:'User'},
    date:{type:Date,default:Date.now,required:true},
    progress:{type:Number,default:0},
    weight:{type:Number,required:true}
})
const WeightLog = mongoose.model('WeightLog', weightLogSchema);

module.exports = WeightLog;