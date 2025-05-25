const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB connection with better error handling
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.MONGODB_URI, 
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
        socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
      }
    );
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

connectDB();

// Middleware
app.use(cors({
  origin: ['https://search-in-map.vercel.app', 'http://localhost:3000'],
  credentials: true
}));

app.use(bodyParser.json());
app.use(express.json());

// Import routes (we'll create this)
const apiRoutes = require('./routes/api');

// API routes
app.use('/api', apiRoutes);

// Health check route
app.get('/', (req, res) => {
  res.json({ message: 'Profile Mapping API is running!' });
});

// Error handling middleware
const handleError = (err, req, res, next) => {
  console.error('Error:', err);
 
  // MongoDB validation error
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(val => val.message);
    return res.status(400).json({
      status: 'error',
      message: messages.join('. ')
    });
  }
 
  // MongoDB duplicate key error
  if (err.code === 11000) {
    return res.status(400).json({
      status: 'error',
      message: 'Duplicate field value entered'
    });
  }
 
  // Default server error
  res.status(err.statusCode || 500).json({
    status: 'error',
    message: err.message || 'Server Error'
  });
};

app.use(handleError);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});