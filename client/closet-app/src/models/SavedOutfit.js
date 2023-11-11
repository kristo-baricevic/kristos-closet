const mongoose = require('mongoose');

const clothingItemSchema = new mongoose.Schema({
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
  clothingItems: {
    Top: { type: clothingItemSchema, default: null },
    Bottom: { type: clothingItemSchema, default: null },
    Shoes: { type: clothingItemSchema, default: null },
    Hat: { type: clothingItemSchema, default: null },
    onePiece: { type: clothingItemSchema, default: null },
    Accessory: { type: clothingItemSchema, default: null },
  },
});

const SavedOutfit = mongoose.model('SavedOutfit', savedOutfitSchema);

module.exports = SavedOutfit;
