const multer = require('multer');
const ClothingItem = require('../models/ClothingItem');

const storage = multer.memoryStorage();
const upload = multer({ storage });

exports.handleUpload = async (req, res) => {
  console.log("inside handle upload controller");
  try {
    const { category } = req.body;
    const imageBuffer = req.file.buffer;
    const userId = req.user._id;

    console.log("user in controller", req.user);
    console.log("image data", imageBuffer );
    console.log("image category", category);

    const clothingItem = new ClothingItem({
      image: imageBuffer,
      category: category,
      userId: userId,
      isUserImage: false,
    });

    await clothingItem.save();

    console.log("clothing item saved is", clothingItem);

    res.json({ message: 'Image uploaded successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
};
