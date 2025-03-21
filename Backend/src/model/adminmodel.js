const mongoose=require('mongoose');
const masterSchema=require('./fitnessmastermodel')

const adminSchema=new mongoose.Schema({
    ...masterSchema.obj, 
    username:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    usertype:{type:String,enum:['admin','trainer','client'],required:true},
})
module.exports=mongoose.model('Admin',adminSchema);

