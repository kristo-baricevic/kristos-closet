const UserClothingItem = require('../models/UserClothingItem');
const ClothingItem = require('../models/ClothingItem');

exports.getImages = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming you've implemented authentication middleware

    const userClothingItems = await UserClothingItem.find({ userId });
    const sharedClothingItems = await ClothingItem.find();

    const images = [];

    sharedClothingItems.forEach(sharedClothingItem => {
      images.push({
        id: sharedClothingItem._id,
        data: sharedClothingItem.image,
        category: sharedClothingItem.category,
      });
    });

    userClothingItems.forEach(userClothingItem => {
      images.push({
        id: userClothingItem._id,
        data: userClothingItem.image,
        category: userClothingItem.category,
        userId: userClothingItem.userId,
      });
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
  
      const clothingItem = await UserClothingItem.findOneAndUpdate(
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
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  };
  
exports.deleteImage = async (req, res) => {
    try {
      const { id } = req.params;
  
      const clothingItem = await UserClothingItem.findOneAndDelete({ _id: id });
  
      if (!clothingItem) {
        return res.status(404).json({ error: 'Image not found' });
      }
  
      res.json({ message: 'Image deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  };
  