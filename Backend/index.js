require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const connectDB = require('./src/config/db');
const fitnessroutes = require('./src/routes/fitnessroutes');

const app = express();

const allowedOrigins = [process.env.ALLOWED_ORIGINS] //single origin in array
 
//CORS configuration
const corsOptions = {
  origin: function (origin,callback) { //origin - fe url , cb- be response Yes → callback(null, true)
    // No → callback(new Error("Not allowed by CORS"))
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); //allow
    } else {
      console.error('Blocked by CORS:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'], //options OPTIONS is an HTTP method, just like GET or POST.
  // But it is not used to get or send data.
  // Its main job is to ask the server “hey, is it OK if I send this request?”
  // Think of it like asking permission first before doing something.
  allowedHeaders: ['Content-Type','Authorization']
};

//Apply CORS before all routes/middleware
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

//middleware
app.use(bodyParser.json());
app.use(cookieParser());

//routes
app.get('/', (req, res) => {
  res.send('Welcome to Happy Fitness API');
});

connectDB();

app.use('/myfitness', fitnessroutes);

/**
 * Global error handler (so Vercel doesn’t crash silently)
 */
app.use((err, req, res, next) => {
  console.error("Unhandled Express error:", err);
  res.status(500).json({
    message: "Internal Server Error",
    error: err.message || "Unknown error"
  });
});

// No app.listen() — Vercel handles it automatically
module.exports = app;
