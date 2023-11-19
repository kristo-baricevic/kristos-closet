const express = require('express');
const app = express();
const routes = require('./routes/routes');
const cors = require('cors');

// Middleware and configurations
app.use(express.json()); 
app.use(cors({
  origin: 'http://localhost:3000',
}));
app.use('/static', express.static('build'));

// Use routes with a base URL of '/api'
app.use('/api', routes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

module.exports = app;

