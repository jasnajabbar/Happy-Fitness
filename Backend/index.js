require('dotenv').config();
const cors = require('cors');
const express=require('express');
const bodyParser = require('body-parser');
const cookieParser=require('cookie-parser');
const jwt=require('jsonwebtoken');
const connectDB=require('./src/config/db');
const fitnessroutes=require('./src/routes/fitnessroutes');


const app=express();

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like curl or Postman)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};


app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Preflight

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
// const PORT=process.env.PORT || 3000;
// app.listen(PORT,()=>{
//   console.log(`server is running on ${PORT}`)
// }); 
//  DO NOT use app.listen on Vercel
//  Instead, export app

module.exports = app;