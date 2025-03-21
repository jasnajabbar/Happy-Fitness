const mongoose=require('mongoose');

const masterSchema=new mongoose.Schema({
    createdAt:{type:Date,default:Date.now},
    // createdBy:{type:mongoose.Schema.Types.ObjectId,ref:"User",
    //     required:function(){
    //         return(this.usertype=='admin')
    //     }
    // },
    updatedAt:{type:Date,default:Date.now},
    // updatedBy:{type:mongoose.Schema.Types.ObjectId,ref:"User",
    //     required:function(){
    //         return(this.usertype=='admin')
    //     }
    // },
    isActive:{type:Boolean,default:true}
})

module.exports=masterSchema;