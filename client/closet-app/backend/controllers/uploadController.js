const multer = require('multer');
const ClothingItem = require('../models/ClothingItem');
const AWS = require('../config/aws-config');
const fs = require('fs');


const storage = multer.memoryStorage();
const upload = multer({ storage });

exports.uploadImageAndMetaData = async (req, res) => {
  try {
    console.log("insideUploadImage...");
    const s3 = new AWS.S3();
    const bucketName = 'closet-app';
    const file = req.file; 
    console.log("backend upload file check", req.file);
    const { category } = req.body;
    const user = req.body.user;
    console.log("testing backend upload");
    console.log("category", category);
    console.log("user in the backend", user.user); //undefined

    const timestampPrefix = Date.now();

    const imageFile = `images/${timestampPrefix}-${file.originalname}`;
    
    console.log("imageFile in the backend", imageFile);
     
    const uploadParams = {
      Bucket: bucketName,
      Key: imageFile,
      Body: fs.createReadStream(file.path),
    };

    // Upload the image to AWS S3
    await s3.upload(uploadParams).promise();

    console.log("upload backend passed checks");

    // Save metadata in the database
    const clothingItem = new ClothingItem({
      category: category,
      isUserImage: false,
      userId: user._id,
      imageUrl: `${imageFile}`,
      filename: file.originalname,
    });
    
    await clothingItem.save();

    // Handle the response and send a success message
    res.json({ message: 'Image and metadata uploaded successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
};
