const mongoose = require('mongoose');

const savedOutfitSchema = new mongoose.Schema({
  outfit: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ClothingItem',
    },
  ],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  imageFileId: mongoose.Schema.Types.ObjectId,
  imageUrl: String,
  filename: String,
});

const SavedOutfit = mongoose.model('SavedOutfit', savedOutfitSchema);

module.exports = SavedOutfit;
