// Error handler middleware
exports.handleError = (err, req, res, next) => {
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