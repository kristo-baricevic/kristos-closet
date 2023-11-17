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
  wardrobe: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Wardrobe', 
  },
});

const outfitSchema = new Schema({
  clothingItems: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ClothingItem', 
  }],
  wardrobe: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Wardrobe',
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
  },
});

const wardrobeSchema = new Schema({
  outfits: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Outfit', 
  }],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
  },
});


const ClothingItem = mongoose.model('ClothingItem', clothingItemSchema);
const Outfit = mongoose.model('Outfit', outfitSchema);
const Wardrobe = mongoose.model('Wardrobe', wardrobeSchema);

module.exports = { ClothingItem, Outfit, Wardrobe };
