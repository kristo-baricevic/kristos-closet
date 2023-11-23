const { Outfit } = require('../models/Closet');
const AWS = require('aws-sdk');

exports.saveOutfit = async (req, res) => {
  try {

    const request = req.body;
    console.log("save outfit controller", request);
    const { name, user, clothingItems } = request;

    // Create a new SavedOutfit doc
    const newOutfit = new Outfit({
      name, 
      clothingItems,
      user
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

exports.getOutfit = async (req, res) => {
  try {
    const { user, outfitId } = req.params;

    if (outfitId) {
      // If outfitId is present, get outfit by ID
      const outfit = await Outfit.findById(outfitId);
      console.log("Outfit by ID:", outfit);
      res.status(200).json(outfit);
    } else {
      // If outfitId is not present, get user outfits
      const userOutfits = await Outfit.find({ user }).populate('clothingItems');
      console.log("User outfits:", userOutfits);
      res.status(200).json(userOutfits);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
};

// exports.getOutfitById = async (req, res) => {
//   try {
//     const { _id } = req.params;
//     const outfit = await Outfit.findById(_id);
//     console.log("outfitById controller", outfit);
//     return outfit;
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'An error occurred' });
//   }
// };
  
// exports.getUserOutfits = async (req, res) => {
//   try {
//     const { user } = req.body;

//     console.log("inside get images");

//     const userOutfits = await Outfit.find({ user }).populate('clothingItems');

//     console.log("userOutfits", userOutfits);

//     res.status(200).json(userOutfits);
//     } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'An error occurred' });
//   }
// };