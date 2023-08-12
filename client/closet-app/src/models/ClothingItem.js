const mongoose = require('mongoose');

const clothingItemSchema = new mongoose.Schema({
  category: String,
  isUserImage: Boolean,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
  },
  imageFileId: mongoose.Schema.Types.ObjectId, 
});

const ClothingItem = mongoose.model('ClothingItem', clothingItemSchema);

module.exports = ClothingItem;
