const { ClothingItem } = require('../models/Closet');
const AWS = require('aws-sdk');

exports.getImages = async (req, res) => {

  try {
    const { user } = req.body;

    const clothingItems = await ClothingItem.find({ $or: [{ user }, { isUserImage: false }] });

    console.log("clothingItems test", clothingItems);

    const images = await Promise.all(clothingItems.map(async item => {
      console.log("item test", item);
      console.log("url test", item.imageUrl);

      const s3 = new AWS.S3();
      const bucketName = 'closet-app';
      const imageKey = `${item.imageUrl}`; 

      const imageObject = await s3.getObject({
        Bucket: bucketName,
        Key: imageKey,
      }).promise();

      console.log(imageObject);

      const imageUrl = `https://kristobaricevic.com/api/images/${item._id}`;

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
  console.log("images controller update");
  try {
    const { id } = req.params;
    const { category } = req.body;
    console.log("id check", id);
    console.log("cat check", category);

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
    console.log("inside delete image backend");
    const  imageId = req.params.id;
    console.log(imageId);
    console.log(req.params.id);

    const clothingItem = await ClothingItem.findOne({ _id: imageId });

    if (!clothingItem) {
      return res.status(404).json({ error: 'Image not found' });
    }
    
    const s3 = new AWS.S3();
    const bucketName = 'closet-app';
    const imageKey = `${clothingItem.imageUrl}`;

    console.log("imageKey test backend", imageKey);

    // Delete image from S3
    await s3.deleteObject({  
      Bucket: bucketName,
      Key: imageKey,
    }).promise();

    // Delete corresponding data from MongoDB
    await ClothingItem.findOneAndDelete({ _id: imageId });

    console.log("after delete in imagesController");

    res.json({ message: 'Image deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
};

