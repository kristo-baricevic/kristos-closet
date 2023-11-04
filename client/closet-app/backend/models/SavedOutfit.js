const mongoose = require('mongoose');

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
  clothingItems: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ClothingItem', 
    },
  ],
  imageUrl: String, 
});

const SavedOutfit = mongoose.model('SavedOutfit', savedOutfitSchema);

module.exports = SavedOutfit;
