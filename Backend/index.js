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
  origin: function (origin, callback) {
    console.log("Request Origin:", origin);
    if (!origin || allowedOrigins.includes(origin)) {  // Fix: Use includes()
      callback(null, true);
    } else {
      console.error("Blocked by CORS:", origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ["GET,HEAD,PUT,PATCH,POST,DELETE"],
  credentials: true, // Allow cookies
  allowedHeaders: ["Content-Type,Authorization"], // Ensure preflight requests allow required headers
};

app.use(cors(corsOptions));

// Handle preflight OPTIONS requests
app.options('*', (req, res) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  res.sendStatus(200);
});
app.get('/',(req,res)=>{res.send("welcome")})

console.log("Loaded ENV Variables:", {
  ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS,
  MONGO_URI: process.env.MONGO_URI,
  PORT: process.env.PORT,
});

app.use('/myfitness',fitnessroutes);

// Global Error Handling
app.use((err, req, res, next) => {
  console.error("Server Error:", err);
  res.status(500).json({ message: "Internal Server Error", error: err.message });
});

// Start Server After DB Connection
connectDB()
  .then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB Connection Failed:", err);
    process.exit(1);
  });