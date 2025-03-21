const mongoose=require('mongoose');
const masterSchema=require('./fitnessmastermodel')

const userSchema=new mongoose.Schema({
    ...masterSchema.obj, //inherit master schema, to access field in master schema
    firstname:{type:String,required:true},
    username:{type:String,required:true,unique:true},
    usertype:{type:String,enum:['admin','trainer','client'],required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    gender:{type:String,required:true,enum:['Male','Female','Others']},
    age:{type:Number},
    height:{type:Number,required:true},
    weight:{type:Number,required:true},
    goal:{type:String,required:true},
    startweight:{type:Number,required:true},
    profilepic:{type:String},
    assignedTrainer:{type: String}
})

const User=mongoose.model('User',userSchema);
module.exports={User};
