const ClothingItem = require('../models/ClothingItem');
const AWS = require('aws-sdk');

exports.getImages = async (req, res) => {
  try {
    const { user } = req.body;

    console.log("inside get images");

    const clothingItems = await ClothingItem.find({ $or: [{ user }, { isUserImage: false }] });

    console.log("clothing items", clothingItems);

    const images = await Promise.all(clothingItems.map(async item => {
      const s3 = new AWS.S3();
      const bucketName = 'closet-app';
      const imageKey = `${item.imageUrl}`; 

      console.log("item filename check", item.imageUrl);
      console.log("imageKey check", imageKey);

      const imageObject = await s3.getObject({
        Bucket: bucketName,
        Key: imageKey,
      }).promise();

      console.log(imageObject);

      const imageUrl = `http://your-server-url/images/${item._id}`;

      console.log("backend URL", imageUrl);

      return {
        id: item._id,
        imageUrl: imageUrl, 
        category: item.category,
        userId: item.userId,
        filename: item.filename,
        contentType: item.contentType
      };
    }));

    res.json(images);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
};

exports.getImageById = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await ClothingItem.findById(id);

    if (!item) {
      return res.status(404).json({ error: 'Image not found' });
    }

    const s3 = new AWS.S3();
    const bucketName = 'closet-app';
    const imageKey = `${item.imageUrl}`; 

    const imageObject = await s3.getObject({
      Bucket: bucketName,
      Key: imageKey,
    }).promise();

    // Send the image as a response
    res.set('Content-Type', item.contentType);
    res.send(imageObject.Body);
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
