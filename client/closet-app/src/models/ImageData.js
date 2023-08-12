const mongoose = require('mongoose');
const { mongo } = require('mongoose');
const conn = mongoose.createConnection('mongodb+srv://admin:0123456789@cluster0.rablf5o.mongodb.net/closet-app?retryWrites=true&w=majority');

// Create a GridFS bucket
const bucket = new mongoose.mongo.GridFSBucket(conn.db, {
  bucketName: 'imageData' 
});

module.exports = bucket;
