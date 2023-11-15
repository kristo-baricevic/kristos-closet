const mongoose = require('mongoose');
const { Schema } = mongoose;

const savedOutfitSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  user: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  clothingItems: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ClothingItem',
  }],
});

const SavedOutfit = mongoose.model('SavedOutfit', savedOutfitSchema);

module.exports = SavedOutfit;
