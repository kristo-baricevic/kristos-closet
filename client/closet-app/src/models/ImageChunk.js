const mongoose = require('mongoose');

const imageChunkSchema = new mongoose.Schema({
  files_id: mongoose.Schema.Types.ObjectId,
  n: Number,
  data: {
    base64: String,
    subType: String
  }
});

module.exports = mongoose.model('ImageChunk', imageChunkSchema);
