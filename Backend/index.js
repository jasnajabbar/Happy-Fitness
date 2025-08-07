require('dotenv').config();
const cors = require('cors');
const express=require('express');
const bodyParser = require('body-parser');
const cookieParser=require('cookie-parser');
const jwt=require('jsonwebtoken');
const connectDB=require('./src/config/db');
const fitnessroutes=require('./src/routes/fitnessroutes');


const app=express();

app.use(cors({
  origin: ['http://localhost:5173', 'https://happy-fitness-fe.vercel.app'],
  credentials: true
}));
app.options('*', cors()); 

//middleware
app.use(bodyParser.json()); //middleware that only parses JSON
app.use(cookieParser());

//Setup CORS using ALLOWED_ORIGINS from the environment variables
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',')
  : ['http://localhost:5173'];

//enable CORS to allow your frontend to connect to the backend
// const corsOptions = {
//   origin: function (origin, callback) {
//     console.log("Request Origin:", origin);
//     if (!origin || allowedOrigins.includes(origin)) {  // Fix: Use includes()
//       callback(null, true);
//     } else {
//       console.error("Blocked by CORS:", origin);
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   methods: ["GET,HEAD,PUT,PATCH,POST,DELETE"],
//   credentials: true, // Allow cookies
//   allowedHeaders: ["Content-Type,Authorization"], // Ensure preflight requests allow required headers
// };



// Handle preflight OPTIONS requests
// app.options('*', cors(corsOptions));
app.get('/',(req,res)=>{res.send("welcome")})

console.log("Loaded ENV Variables:", process.env);
console.log("MongoDB URI:", process.env.MONGO_URI);
connectDB();

app.use('/myfitness',fitnessroutes);
const PORT=process.env.PORT || 3000;
app.listen(PORT,()=>{
  console.log(`server is running on ${PORT}`)
}); 