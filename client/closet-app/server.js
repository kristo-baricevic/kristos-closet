const express = require('express');
const app = express();
const routes = require('./routes/routes');
const mongoose = require('mongoose');
const dotenv = require('dotenv'); // For loading environment variables

// Load environment variables from a .env file
dotenv.config();

// Connect to the database
mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware and configurations
app.use(express.json()); // Parse JSON request bodies
app.use(cors()); // Handle CORS
app.use('/static', express.static('public')); // Serve static files from a "public" directory

// Use routes with a base URL of '/api'
app.use('/api', routes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
