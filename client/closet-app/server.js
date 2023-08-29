const routes = require('./src/routes/routes');
const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');


// Connect to the database
console.log("DB_URI:", process.env.MONGODB_URI);
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const corsOptions = {
  origin: [
    'http://localhost:3000', 
    'http://localhost:5000', 
    'http://kristos-closet.vercel.app',
    'http://closet-app-backend.fly.dev/',
    'http://fly.io/apps/closet-app-backend/monitoring'
  ],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

// Serve the static files from the build directory
app.use(express.static(path.join(__dirname, 'client', 'closet-app', 'build')));


// Middleware and configurations
app.use(express.json()); 
app.use(cors(corsOptions)); 
app.use('/static', express.static('public'));

// Use routes with a base URL of '/api'
app.use('/api', routes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

// Catch-all route to serve the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'closet-app', 'build', 'index.html'));
});


// Start the HTTP server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
