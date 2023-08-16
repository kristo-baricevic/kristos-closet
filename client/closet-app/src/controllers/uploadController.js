const multer = require('multer');
const axios = require('axios');
const ClothingItem = require('../models/ClothingItem');
const FormData = require('form-data');
const AWS = require('../config/aws-config');

const storage = multer.memoryStorage();
const upload = multer({ storage });

exports.uploadImageAndMetaData = async (req, res) => {
  try {
    const s3 = new AWS.S3();
    const bucketName = 'closet-app';
    const file = req.file; // Access the uploaded file from req
    const { category } = req.body;
    const userId = req.user._id; // Assuming you have the user data in req.user

    // Upload the image to AWS S3
    const filename = `images/${Date.now()}-${file.originalname}`;
    const uploadParams = {
      Bucket: bucketName,
      Key: filename,
      Body: file.buffer, // Use file.buffer to upload file content
      ACL: 'public-read',
    };
    await s3.upload(uploadParams).promise();

    // Save metadata in the database
    const clothingItem = new ClothingItem({
      category: category,
      isUserImage: false,
      userId: userId,
      imageUrl: `https://${bucketName}.s3.amazonaws.com/${filename}`, // Add the S3 URL to metadata
    });
    await clothingItem.save();

    // Handle the response and send a success message
    res.json({ message: 'Image and metadata uploaded successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
};
