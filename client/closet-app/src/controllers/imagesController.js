const ClothingItem = require('../models/ClothingItem');

exports.getImages = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming you've implemented authentication middleware

    const clothingItems = await ClothingItem.find({ $or: [{ userId }, { isUserImage: false }] });

    const images = clothingItems.map(item => ({
      id: item._id,
      data: item.image,
      category: item.category,
      userId: item.userId,
    }));

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
