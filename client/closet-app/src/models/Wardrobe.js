import outfit from './SavedOutfit';
const mongoose = require('mongoose');

const wardrobeSchema = new mongoose.Schema({
  outfit: outfit,
  category2: outfit,
  isUserImage: Boolean,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
  },
  imageFileId: mongoose.Schema.Types.ObjectId, 
  imageUrl: String, 
  filename: String,
});

const wardrobe = mongoose.model('wardrobe', wardrobeSchema);

module.exports = wardrobe;
