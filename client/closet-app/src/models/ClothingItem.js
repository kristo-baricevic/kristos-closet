const mongoose = require('mongoose');
const { Schema } = mongoose;

const clothingItemSchema = new Schema({
  category: String,
  isUserImage: Boolean,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
  },
  imageFileId: mongoose.Schema.Types.ObjectId, 
  imageUrl: String, 
  filename: String,
});

const outfitSchema = new Schema({
  outfit: [clothingItemSchema],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
  },
});

const wardrobeSchema = new Schema({
  wardrobe: [outfitSchema],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
  },
});


const ClothingItem = mongoose.model('ClothingItem', clothingItemSchema);
const Outfit = mongoose.model('Outfit', outfitSchema);
const Wardrobe = mongoose.model('Wardrobe', wardrobeSchema);

module.exports = { ClothingItem, Outfit, Wardrobe };
