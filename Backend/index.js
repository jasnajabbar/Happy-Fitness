require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const connectDB = require('./src/config/db');
const fitnessroutes = require('./src/routes/fitnessroutes');

const app = express();

/**
 * Allowed origins from .env
 * Example in .env:
 * ALLOWED_ORIGINS=https://happy-fitness-fe.vercel.app,http://localhost:5173
 */
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',').map(o => o.trim())
  : [];

//CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.error('Blocked by CORS:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
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
