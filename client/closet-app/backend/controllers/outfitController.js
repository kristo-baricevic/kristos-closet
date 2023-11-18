const { Outfit } = require('../models/Closet');
const AWS = require('aws-sdk');

exports.saveOutfit = async (req, res) => {

  const request = req.body;
  console.log("save outfit controller", request);
  
  // Destructure parameters to set up data in the same format as the mongoose model
  const { name, description, user, clothingItems } = request;


    if ( name === null || description === null || user === null || clothingItems === null ) {
      alert("your outfit is incomplete!");
      return;
    } else {
      try {

      // Create a new SavedOutfit doc
      const newOutfit = new Outfit({
        name, 
        description,
        user, 
        clothingItems,
      });

      console.log("savedOutfitDoc URL", newOutfit);

      // Save the outfit to the database
      const result = await newOutfit.save();
      console.log("outfit potentially saved", result);
      res.status(201).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while saving the outfit' });
    }
  };
};
  
  exports.deleteOutfit = async (req, res) => {
    try {
      const outfitId = req.params.id;
  
      // Delete the outfit from the database
      await Outfit.findOneAndDelete({ _id: outfitId });
  
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
    const outfit = await Outfit.findOneAndUpdate({ _id: outfitId }, updatedOutfit, {
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

exports.getOutfitById = async (req, res) => {
  try {
    const { _id } = req.params;
    const outfit = await Outfit.findById(_id);

    return outfit;
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
};
  
exports.getOutfit = async (req, res) => {
  try {
    const { user } = req.body;

    console.log("inside get images");

    const outfit = await Outfit.findOne({ $or: [{ user }] });

    return outfit;
    } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
};