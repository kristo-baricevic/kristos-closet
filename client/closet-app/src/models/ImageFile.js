const mongoose = require('mongoose');

const imageFileSchema = new mongoose.Schema({
  length: Number,
  chunkSize: Number,
  uploadDate: Date,
  filename: String,
  contentType: String
});

module.exports = mongoose.model('ImageFile', imageFileSchema);

