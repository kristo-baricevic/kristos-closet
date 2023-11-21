const mongoose = require('mongoose');
const { Schema } = mongoose;

const clothingItemSchema = new Schema({
  category: String,
  isUserImage: Boolean,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
  },
  imageUrl: String, 
  filename: String,
  outfits: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Outfit', 
  }],
});

const outfitSchema = new Schema({
  name: String,
  clothingItems: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ClothingItem', 
  }],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
  },
});


const ClothingItem = mongoose.model('ClothingItem', clothingItemSchema);
const Outfit = mongoose.model('Outfit', outfitSchema);

module.exports = { ClothingItem, Outfit };
