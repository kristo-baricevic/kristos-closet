//start server in production
const express = require('express');
const port = process.env.PORT || 5000;
const app = express();
// const cors = require('cors');

// const corsOptions = {
//   origin: [
//     'http://localhost:3000', 
//     'http://kristos-closet.vercel.app' 
//   ],
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   credentials: true,
//   optionsSuccessStatus: 204,
// };

require('dotenv').config();
// app.use(cors(corsOptions)); 


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

