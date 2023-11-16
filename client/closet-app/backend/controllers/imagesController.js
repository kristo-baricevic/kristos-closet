const { ClothingItem } = require('../models/ClothingItem');
const AWS = require('aws-sdk');
const s3 = new AWS.S3();



exports.getImages = async (req, res) => {

  try {

    // Get user data from request body
    const { user } = req.body;

    // Find clothing from Mongo associated with user or the default data (default data = isUserImage: False)  
    const clothingItems = await ClothingItem.find({ $or: [{ user }, { isUserImage: false }] });

    const images = await Promise.all(clothingItems.map(async clothingItem => {

      const bucketName = 'closet-app';
      const imageKey = `${clothingItem.imageUrl}`; 

      const imageObject = await s3.getObject({
        Bucket: bucketName,
        Key: imageKey,
      }).promise();

      console.log(imageObject);

      const imageUrl = `https://kristobaricevic.com/api/images/${clothingItem._id}`;

      //return data to be used in clothingItem cardsconst ClothingItem = require('../models/ClothingItem');
const AWS = require('aws-sdk');

exports.getImages = async (req, res) => {

  try {

    // Get user data from request body
    const { user } = req.body;

    // Find clothing from Mongo associated with user or the default data (default data = isUserImage: False)  
    const clothingItems = await ClothingItem.find({ $or: [{ user }, { isUserImage: false }] });

    const images = await Promise.all(clothingItems.map(async clothingItem => {

      const bucketName = 'closet-app';
      const imageKey = `${clothingItem.imageUrl}`; 

      const imageObject = await s3.getObject({
        Bucket: bucketName,
        Key: imageKey,
      }).promise();

      console.log(imageObject);

      const imageUrl = `https://kristobaricevic.com/api/images/${clothingItem._id}`;

      //return data to be used in clothingItem cards
      return {
        id: clothingItem._id,
        imageUrl: imageUrl, 
        category: clothingItem.category,
        userId: clothingItem.userId,
        filename: clothingItem.filename,
        contentType: clothingItem.contentType
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
    const clothingItem = await ClothingItem.findById(id);

    if (!clothingItem) {
      return res.status(404).json({ error: 'Image not found' });
    }

    const bucketName = 'closet-app';
    const imageKey = `${clothingItem.imageUrl}`; 

    const imageObject = await s3.getObject({
      Bucket: bucketName,
      Key: imageKey,
    }).promise();

    // Send the image as a response
    res.set('Content-Type', clothingItem.contentType);
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


      return {
        id: clothingItem._id,
        imageUrl: imageUrl, 
        category: clothingItem.category,
        userId: clothingItem.userId,
        filename: clothingItem.filename,
        contentType: clothingItem.contentType
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
    const clothingItem = await ClothingItem.findById(id);

    if (!clothingItem) {
      return res.status(404).json({ error: 'Image not found' });
    }

    const bucketName = 'closet-app';
    const imageKey = `${clothingItem.imageUrl}`; 

    const imageObject = await s3.getObject({
      Bucket: bucketName,
      Key: imageKey,
    }).promise();

    // Send the image as a response
    res.set('Content-Type', clothingItem.contentType);
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

