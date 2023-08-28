const routes = require('./src/routes/routes');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

// Load environment variables from a .env file
// dotenv.config({ path: '/Users/kristo/kristos-closet/client/closet-app/.env.local' });

// Connect to the database
console.log("DB_URI:", process.env.MONGODB_URI);
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const corsOptions = {
  origin: [
    'http://localhost:3000', 
    'https://kristos-closet.vercel.app',
    'https://closet-app-backend.fly.dev/',
    'https://fly.io/apps/closet-app-backend/monitoring'
  ],
  allowedHeaders: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

// Middleware and configurations
app.use(express.json()); 
app.use(cors(corsOptions)); 
app.use('/static', express.static('public'));

// Default route
app.get('/', (req, res) => {
  res.send('Express on Vercel');
});


// Use routes with a base URL of '/api'
app.use('/api', routes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start the HTTP server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
