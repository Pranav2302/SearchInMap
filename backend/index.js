const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Database connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch((err) => console.error('MongoDB connection error:', err));

// CORS configuration
app.use(cors({
  origin: ['https://search-in-map-tvex.vercel.app', 'http://localhost:3000'],
  credentials: true
}));

app.use(express.json());

// Routes - this should mount your API routes under /api
app.use('/api', require('./routes/api'));

// Health check
app.get('/', (req, res) => {
  res.json({ 
    message: 'Backend is running!',
    timestamp: new Date().toISOString(),
    dbStatus: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// Test route to check if profiles endpoint is working
app.get('/test', async (req, res) => {
  try {
    const Profile = require('./models/Profile');
    const count = await Profile.countDocuments();
    res.json({ 
      message: 'Test route working',
      profileCount: count,
      dbStatus: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Test route error',
      error: error.message 
    });
  }
});

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

// For Vercel
module.exports = app;