const mongoose = require('mongoose');

const clothingItemSchema = new mongoose.Schema({
  image: {
    data: mongoose.Schema.Types.Buffer, 
    contentType: mongoose.Schema.Types.String, 
  },
  category: String,
  isUserImage: Boolean,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
  },
});

const ClothingItem = mongoose.model('ClothingItem', clothingItemSchema);

module.exports = ClothingItem;
