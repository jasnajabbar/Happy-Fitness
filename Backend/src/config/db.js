const mongoose=require('mongoose')

//fucntion to connect to mongodb
const connectDB=async ()=>{
    try {
        console.log("Attempting to connect to MongoDB...");
        console.log("MongoDB URI:", process.env.MONGO_URI);
        //connect to mongodb using url from .env
        await mongoose.connect(process.env.MONGO_URI);// async awit used for connection
        console.log("connected to mongodb")
    } catch (err) {
        console.error('error connecting to mongoose:',err.message)
        process.exit(1)  //exit the process on error
    }
}

module.exports=connectDB;