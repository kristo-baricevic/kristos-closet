const multer = require('multer');
const ClothingItem = require('../models/ClothingItem');

const storage = multer.memoryStorage();
const upload = multer({ storage });

exports.uploadImage = upload.single('imageFile');

exports.handleUpload = async (req, res) => {
  console.log("inside handle upload controller");
  try {
    const { category } = req.body;
    const imageBuffer = req.file.buffer;
    const userId = req.user._id;

    console.log("user in controller", user);

    // Your preprocessing and category classification logic here...

    const clothingItem = new ClothingItem({
      image: imageBuffer,
      category,
      userId,
      isUserImage: true,
    });

    await clothingItem.save();

    res.json({ message: 'Image uploaded successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
};
