//start server in production
// const app = require('./server.js');
const express = require('express');
const port = process.env.PORT || 5000;
const app = express();

require('dotenv').config();

app.use(express.json()); 
app.use('/', (req, res) => {  
  console.log('Request to walk-in received.');
  res.send('Welcome to the Walk-In Closet');
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal closet error' });
});

app.listen(port, () => {
  console.log(`Server is definitely running on port ${port}`);
});