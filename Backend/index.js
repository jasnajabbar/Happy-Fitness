require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const connectDB = require('./src/config/db');
const fitnessroutes = require('./src/routes/fitnessroutes');

const app = express();

// CORS configuration for multiple url
const allowedOrigins = process.env.ALLOWED_ORIGINS.split(',')
  .map(o => o.trim().replace(/\/$/, ''));

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);

    const cleanOrigin = origin.replace(/\/$/, '');

    if (allowedOrigins.includes(cleanOrigin)) {
      callback(null, true);
    } else {
      console.log("Blocked by CORS:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
};

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

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
