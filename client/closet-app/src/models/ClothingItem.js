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

const ClothingItem = mongoose.model('ClothingItem', clothingItemSchema);

module.exports = ClothingItem;
