const routes = require('./src/routes/routes');
const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config({ path: '/Users/kristo/kristos-closet/client/closet-app/.env.local' });


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


// Middleware and configurations
app.use(express.json()); 
app.use(cors(corsOptions)); 
app.use('/static', express.static('build'));

// Use routes with a base URL of '/api'
app.use('/api', routes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});


// Start the HTTP server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
