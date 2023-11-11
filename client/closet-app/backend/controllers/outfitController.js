const SavedOutfit = require('../models/SavedOutfit');
const AWS = require('aws-sdk');

exports.saveOutfit = async (req, res) => {
    console.log("save outfit controller", req.body);
    console.log("request body")
    
    // Destructure parameters to set up data in the same format as the mongoose model
    const { name, description, user, clothingItems } = req.body;
    const { Top, Bottom, Shoes, Hat, onePiece, Accessory } = clothingItems;

    console.log("clothing items received", clothingItems);
    console.log(Top, Bottom, Shoes, Hat, onePiece, Accessory);



    try {
      // Create a new SavedOutfit document
      const savedOutfitDoc = new SavedOutfit({
        name: name, 
        description: description,
        user: user, 
        outfit: [
          Top || null,
          Bottom || null,
          Shoes || null,
          Hat || null,
          onePiece || null,
          Accessory || null,
        ],
      });

      console.log("savedOutfitDoc URL", savedOutfitDoc);
  
      // Save the outfit to the database
      const result = await savedOutfitDoc.save();
      console.log("outfit potentially saved", result);
      res.status(201).json(result);
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

  