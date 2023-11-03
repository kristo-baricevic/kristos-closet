const mongoose = require('mongoose');

const wardrobeSchema = new mongoose.Schema({
  outfits: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SavedOutfit',
    },
  ],
  isUserImage: Boolean,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  imageFileId: mongoose.Schema.Types.ObjectId,
  imageUrl: String,
  filename: String,
});

const Wardrobe = mongoose.model('Wardrobe', wardrobeSchema);

module.exports = Wardrobe;
