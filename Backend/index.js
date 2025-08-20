require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const connectDB = require('./src/config/db');
const fitnessroutes = require('./src/routes/fitnessroutes');

const app = express();

/**
 * ✅ Load allowed origins from .env (comma separated)
 * Example in .env:
 * ALLOWED_ORIGINS=https://happy-fitness-fe.vercel.app,http://localhost:5173
 */
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',').map(o => o.trim())
  : [];

/**
 * ✅ CORS configuration
 */
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.error('❌ Blocked by CORS:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // allow cookies (important!)
};

// ✅ Apply CORS before all routes/middleware
app.use(cors(corsOptions));

// ✅ Handle preflight requests globally
app.options('*', cors(corsOptions));

/**
 * Middleware
 */
app.use(bodyParser.json());
app.use(cookieParser());

/**
 * Routes
 */
app.get('/', (req, res) => {
  res.send('Welcome to Happy Fitness API 🚀');
});

connectDB();

app.use('/myfitness', fitnessroutes);

/**
 * 🚀 Export app for Vercel (no app.listen here!)
 */
module.exports = app;

// require('dotenv').config();
// const cors = require('cors');
// const express=require('express');
// const bodyParser = require('body-parser');
// const cookieParser=require('cookie-parser');
// const jwt=require('jsonwebtoken');
// const connectDB=require('./src/config/db');
// const fitnessroutes=require('./src/routes/fitnessroutes');


// const app=express();

// //Setup CORS using ALLOWED_ORIGINS from the environment variables
// const allowedOrigins = [
//   'http://localhost:5173',
//   'https://happy-fitness-fe.vercel.app'
// ];

// const corsOptions = {
//   origin: function (origin, callback) {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       console.error("Blocked by CORS:", origin);
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   preflightContinue: false,
//   optionsSuccessStatus: 200, // for legacy browsers
// };


// app.use(cors(corsOptions));
// app.options('*', cors(corsOptions)); // Preflight

// //middleware
// app.use(bodyParser.json()); //middleware that only parses JSON
// app.use(cookieParser());


// //enable CORS to allow your frontend to connect to the backend
// // const corsOptions = {
// //   origin: function (origin, callback) {
// //     console.log("Request Origin:", origin);
// //     if (!origin || allowedOrigins.includes(origin)) {  // Fix: Use includes()
// //       callback(null, true);
// //     } else {
// //       console.error("Blocked by CORS:", origin);
// //       callback(new Error('Not allowed by CORS'));
// //     }
// //   },
// //   methods: ["GET,HEAD,PUT,PATCH,POST,DELETE"],
// //   credentials: true, // Allow cookies
// //   allowedHeaders: ["Content-Type,Authorization"], // Ensure preflight requests allow required headers
// // };



// // Handle preflight OPTIONS requests
// // app.options('*', cors(corsOptions));
// app.get('/',(req,res)=>{res.send("welcome")})

// console.log("Loaded ENV Variables:", process.env);
// console.log("MongoDB URI:", process.env.MONGO_URI);
// connectDB();

// app.use('/myfitness',fitnessroutes);
// // const PORT=process.env.PORT || 3000;
// // app.listen(PORT,()=>{
// //   console.log(`server is running on ${PORT}`)
// // }); 
// //  DO NOT use app.listen on Vercel
// //  Instead, export app

// module.exports = app;