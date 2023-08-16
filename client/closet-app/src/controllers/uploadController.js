const multer = require('multer');
const axios = require('axios');
const ClothingItem = require('../models/ClothingItem');

const storage = multer.memoryStorage();
const upload = multer({ storage });

exports.uploadMetaDataToMongo = async (req, res) => {
  console.log("inside handle upload controller");
  try {
    console.log("log the response", req.body);
    console.log("log the response", req);
    console.log("log the response", req.body.user._id);
    const { category } = req.body;
    const imageBuffer = req.file.buffer;
    const userId = req.body.user._id;

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

exports.uploadImageToBunny = async (req, res) => {
  try {
    const apiKey = 'a4549349-7570-48dc-90bcb125fe09-432e-4606';
    const storageZoneName = 'closet-app';
    const fileName = req.file.originalname;
    const fileBuffer = req.file.buffer;

    // Upload the file to BunnyCDN Storage
    const formData = new FormData();
    formData.append('file', fileBuffer, { filename: fileName });

    const response = await axios.post(
      `https://${storageZoneName}.b-cdn.net/api/upload`,
      formData,
      {
        headers: {
          ...formData.getHeaders(),
          'AccessKey': apiKey,
        },
      }
    );

    // Handle the response and send a success message
    console.log('File uploaded:', response.data);
    res.json({ message: 'Image uploaded successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
};
