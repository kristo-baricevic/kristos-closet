// const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost/your-database-name', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const db = mongoose.connection;

// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.once('open', () => {
//   console.log('Connected to MongoDB');import express from 'express';
//   import { connectToDatabase } from './config/database';
  
//   const app = express();
  
//   // Connect to the MongoDB database
//   connectToDatabase().then(({ client, db }) => {
//       console.log('Connected to MongoDB');
  
//       // Set up your routes and other application logic here
//       // For example:
//       // app.get('/api/users', async (req, res) => {
//       //     const users = await db.collection('users').find().toArray();
//       //     res.json(users);
//       // });
  
//       const PORT = process.env.PORT || 3000;
//       app.listen(PORT, () => {
//           console.log(`Server is running on port ${PORT}`);
//       });
//   }).catch(error => {
//       console.error('Error connecting to MongoDB:', error);
//   });
  
// });

// module.exports = db;
