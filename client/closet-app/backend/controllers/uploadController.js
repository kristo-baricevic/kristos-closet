const multer = require('multer');
const { ClothingItem } = require('../models/Closet');
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
    const { category } = req.body;
    const user = req.body.user;

    const timestampPrefix = Date.now();

    const imageFile = `images/${timestampPrefix}-${file.originalname}`;
         
    const uploadParams = {
      Bucket: bucketName,
      Key: imageFile,
      Body: fs.createReadStream(file.path),
    };

    try {
      // Upload the image to AWS S3
      const result = await s3.upload(uploadParams).promise();
      console.log(result);
    } catch (error) {
      console.error(error);
      console.log("there has been an error");
    };

    try {

      // Save in the database
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
      fs.unlinkSync(file.path);
    } catch (error) {
      console.error(error);
      
      // Rollback logic (if needed) or handle errors more specifically
      await s3.deleteObject({ Bucket: bucketName, Key: imageFile }).promise();
      fs.unlinkSync(file.path);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
};
