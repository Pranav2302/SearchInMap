const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// CORS configuration
app.use(cors({
  origin: ['https://search-in-map.vercel.app', 'http://localhost:3000'],
  credentials: true
}));

app.use(express.json());

// Routes - this should mount your API routes under /api
app.use('/api', require('./routes/api'));

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Backend is running!' });
});

// For Vercel
module.exports = app;