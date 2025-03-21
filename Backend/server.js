require('dotenv').config();
const cors = require('cors');
const express=require('express');
const bodyParser = require('body-parser');
const cookieParser=require('cookie-parser');
const jwt=require('jsonwebtoken');
const connectDB=require('./src/config/db');
const fitnessroutes=require('./src/routes/fitnessroutes');

const app=express();

//middleware
app.use(bodyParser.json()); //middleware that only parses JSON
app.use(cookieParser());

//Setup CORS using ALLOWED_ORIGINS from the environment variables
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',')
  : ['http://localhost:5173'];

//enable CORS to allow your frontend to connect to the backend
const corsOptions = {
  origin: function (origin,callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Allow cookies
};

app.use(cors(corsOptions));

console.log("Loaded ENV Variables:", process.env);
console.log("MongoDB URI:", process.env.MONGO_URI);
connectDB();

app.use('/myfitness',fitnessroutes);

const PORT=process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`)
});