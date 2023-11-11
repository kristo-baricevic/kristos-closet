const mongoose = require('mongoose');

const wardrobeSchema = new mongoose.Schema({
  outfit: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SavedOutfit',
    },
  ],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Wardrobe = mongoose.model('Wardrobe', wardrobeSchema);

module.exports = Wardrobe;
