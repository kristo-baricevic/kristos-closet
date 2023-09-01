// start server in production
const express = require('express');
const port = process.env.PORT || 5000;
const app = express();
const cors = require('cors');
const ApiRouter = require('./routes/routes');
const dotenv = require ('dotenv');
const mongoose = require('mongoose');


// set-up cors
const corsOptions = {
  origin: [
    'http://localhost:3000', 
    'https://kristos-closet.vercel.app'
  ],
  methods: 'GET,HEAD,PUT,OPTIONS,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

// local variables for local testing
// dotenv.config({ path: './.env' });

// local variables for deloployment environment
dotenv.config();
console.log("env loaded 1/2 ", process.env.MONGODB_URI);

// test connection to mongo db
mongoose.connect(process.env.MONGODB_URI);
console.log("passed the mongoose!");

app.use(cors(corsOptions)); 
// app.use(cors());

app.use(express.json()); 

app.use('/api', ApiRouter);

app.use('/', (req, res, next) => {  
  console.log('Request to walk-in received.');
  res.send('Welcome to the Walk-In Closet');
});


app.listen(port, () => {
  console.log(`Server is definitely, definitely running on port ${port}`);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal closet error' });
});

