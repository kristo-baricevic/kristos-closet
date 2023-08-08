const multer = require('multer');
const UserClothingItem = require('../models/UserClothingItem');
const ClothingItem = require('../models/ClothingItem');

const storage = multer.memoryStorage();
const upload = multer({ storage });

exports.uploadImage = upload.single('imageFile');

exports.handleUpload = async (req, res) => {
  try {
    const { category } = req.body;
    const imageBuffer = req.file.buffer;
    const userId = req.user._id; // Assuming you've implemented authentication middleware

    // Your preprocessing and category classification logic here...

    const userClothingItem = new UserClothingItem({
      image: imageBuffer,
      category,
      userId,
      isUserImage: true,
    });

    await userClothingItem.save();

    res.json({ message: 'Image uploaded successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
};
