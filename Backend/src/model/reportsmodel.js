const mongoose=require('mongoose');
const masterSchema=require('./fitnessmastermodel')

const reportSchema=new mongoose.Schema({
    ...masterSchema.obj,
    username:{type:String,required:true},
    reportdata:{type:String,required:true},
})

module.exports=mongoose.model('Report',reportSchema)
