const ClothingItem = require('../models/ClothingItem');
const ImageChunk = require('../models/ImageChunk');
const ImageFile = require('../models/ImageFile');
const mongoose = require('mongoose');

exports.getImages = async (req, res) => {
  try {
    const { user } = req.body;

    const clothingItems = await ClothingItem.find({ $or: [{ user }, { isUserImage: false }] });

    const imageIds = clothingItems.map(item => new mongoose.Types.ObjectId(item.imageFileId));
    
    const imageChunks = await ImageChunk.find({ files_id: { $in: imageIds } });

    const matchingChunks = imageChunks.filter(chunk => imageIds.includes(chunk.files_id.toString()));

    const imageFiles = await ImageFile.find({ _id: { $in: imageIds } });

    const images = clothingItems.map(item => {
      const imageData = imageChunks
        .filter(chunk => chunk.files_id.equals(item.imageFileId))
        .map(chunk => chunk.data.toString('base64'))
        .join('');

      const imageFile = imageFiles.find(file => file._id.equals(item.imageFileId));

      return {
        id: item._id,
        data: imageData,
        category: item.category,
        userId: item.userId,
        filename: imageFile.filename,
        contentType: imageFile.contentType
      };
    });

    res.json(images);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
};

exports.updateImage = async (req, res) => {
  try {
    const { id } = req.params;
    const { category } = req.body;

    const clothingItem = await ClothingItem.findOneAndUpdate(
      { _id: id },
      { $set: { category } },
      { new: true }
    );

    if (!clothingItem) {
      return res.status(404).json({ error: 'Image not found' });
    }

    res.json({
      id: clothingItem._id,
      data: clothingItem.image,
      category: clothingItem.category,
      userId: clothingItem.userId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
};

exports.deleteImage = async (req, res) => {
  try {
    const { id } = req.params;

    const clothingItem = await ClothingItem.findOneAndDelete({ _id: id });

    if (!clothingItem) {
      return res.status(404).json({ error: 'Image not found' });
    }

    res.json({ message: 'Image deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
};
