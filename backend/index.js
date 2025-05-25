const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Database connection (remove deprecated options)
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('MongoDB connected successfully'))
.catch((err) => console.error('MongoDB connection error:', err));

// CORS configuration
app.use(cors({
  origin: ['https://search-in-map-tvex.vercel.app', 'http://localhost:3000'],
  credentials: true
}));

app.use(express.json());

// Health check route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Backend is running!',
    timestamp: new Date().toISOString(),
    dbStatus: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// Routes - FIXED
try {
  app.use('/api', require('./routes/api'));
} catch (error) {
  console.error('Route loading error:', error);
}

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Error:', error);
  res.status(500).json({ 
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    message: 'Route not found',
    path: req.originalUrl 
  });
});

// Export for Vercel
module.exports = app;