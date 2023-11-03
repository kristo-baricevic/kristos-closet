const savedOutfit = require('../models/savedOutfit');
const AWS = require('aws-sdk');

exports.saveOutfit = async (req, res) => {
    console.log("images controller update");
    try {
      const { selectedItems } = req.params;
      const { savedOutfit } = req.body;
      console.log("id check", selectedItems);
      console.log("cat check", savedOutfit);
  
      // save the outfit
  
      // const clothingItem = await ClothingItem.findOneAndUpdate(
      //   { _id: id },
      //   { $set: { category } },
      //   { new: true }
      // );
  
      // if (!clothingItem) {
      //   return res.status(404).json({ error: 'Image not found' });
      // }
  
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

  exports.deleteOutfit = async (req, res) => {
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

  exports.updateOutfit = async (req, res) => {
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
  