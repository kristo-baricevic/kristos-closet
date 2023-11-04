const mongoose = require('mongoose');
const ClothingItem = require('./ClothingItem');

const savedOutfitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
  },
  clothingItems: [ClothingItem],

  imageUrl: String, 
});

const SavedOutfit = mongoose.model('SavedOutfit', savedOutfitSchema);

module.exports = SavedOutfit;
