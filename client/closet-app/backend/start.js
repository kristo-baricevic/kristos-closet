//start server in production
const express = require('express');
const port = process.env.PORT || 5000;
const app = express();
const cors = require('cors');
// const routes = require('./routes/routes');


const corsOptions = {
  origin: [
    'http://localhost:3000', 
    'http://kristos-closet.vercel.app' 
  ],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

require('dotenv').config();
app.use(cors(corsOptions)); 

app.use(express.json()); 
app.use('/', (req, res) => {  
  console.log('Request to walk-in received.');
  res.send('Welcome to the Walk-In Closet');
});

// app.use('/api', routes);
// app.use('/static', express.static('build'));


app.listen(port, () => {
  console.log(`Server is definitely running on port ${port}`);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal closet error' });
});


