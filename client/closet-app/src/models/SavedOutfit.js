const mongoose = require('mongoose');
const { selectedItems } = require('../features/selectedItemsSlice');

const savedOutfitSchema = new mongoose.Schema({
  outfit: selectedItems,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
  },
  imageFileId: mongoose.Schema.Types.ObjectId, 
  imageUrl: String, 
  filename: String,
});

const savedOutfit = mongoose.model('outfit', savedOutfitSchema);

module.exports = savedOutfit;
