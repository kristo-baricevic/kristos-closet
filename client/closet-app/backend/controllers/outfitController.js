const SavedOutfit = require('../models/SavedOutfit');
const AWS = require('aws-sdk');

exports.saveOutfit = async (req, res) => {
    console.log("save outfit controller", req.body);
    console.log("request body", )
    const { name, description, user, clothingItems } = req.body;
    console.log("clothing items received", clothingItems);

    try {
      // Create a new SavedOutfit document
      const savedOutfitDoc = new SavedOutfit({
        name: name, 
        description: description,
        user: user, 
        outfit: {
          Top: clothingItems.Top || null,
          Bottom: clothingItems.Bottom || null,
          Shoes: clothingItems.Shoes || null,
          Hat: clothingItems.Hat || null,
          onePiece: clothingItems.onePiece || null,
          Accessory: clothingItems.Accessory || null,
        },
      });

      console.log("savedOutfitDoc URL", savedOutfitDoc.imageUrl);
  
      // Save the outfit to the database
      await savedOutfitDoc.save();
      console.log("outfit potentially saved");
      res.status(201).json(savedOutfitDoc);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while saving the outfit' });
    }
  };
  
  exports.deleteOutfit = async (req, res) => {
    try {
      const outfitId = req.params.id;
  
      // Delete the outfit from the database
      await SavedOutfit.findOneAndDelete({ _id: outfitId });
  
      res.json({ message: 'Outfit deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while deleting the outfit' });
    }
  };

  exports.updateOutfit = async (req, res) => {
  try {
    const outfitId = req.params.id;
    const updatedOutfit = req.body;

    // Find and update the outfit by its ID
    const outfit = await SavedOutfit.findOneAndUpdate({ _id: outfitId }, updatedOutfit, {
      new: true,
    });

    if (!outfit) {
      return res.status(404).json({ error: 'Outfit not found' });
    }

    res.json(outfit);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while updating the outfit' });
  }
};

  