const { ClothingItem, Outfit, Wardrobe } = require("../models/Closet");

exports.addToWardrobe = async (req, res) => {
  try {
    const { outfit, userId } = req.body;

    // Create a new SavedOutfit document for the wardrobe
    const wardrobeOutfit = new Wardrobe({
      outfit: outfit,
      userId: userId,
    });

    // Save the wardrobe outfit to the database
    await wardrobeOutfit.save();
    console.log("wardrobe pot. saved", wardrobeOutfit);

    res.status(201).json(wardrobeOutfit);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while adding the outfit to the wardrobe' });
  }
};

exports.removeFromWardrobe = async (req, res) => {
  try {
    const wardrobeOutfitId = req.params.id;

    // Delete the outfit from the wardrobe in the database
    await Wardrobe.findOneAndDelete({ _id: wardrobeOutfitId });

    res.json({ message: 'Outfit removed from the wardrobe successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while removing the outfit from the wardrobe' });
  }
};

exports.getWardrobeOutfits = async (req, res) => {
  try {
    const userId = req.params.userId;

    console.log("request body", userId);
    console.log("request body", req.params.userId);

    // Retrieve all outfits in the wardrobe for the given user
    const outfits = await Outfit.find({ user: userId });

    await Outfit.populate(outfits, { path: 'outfit' });

    // Map over each outfit and populate the 'outfit' field in each ClothingItem
    const populatedOutfits = await Promise.all(outfits.map(async (outfit) => {
      await ClothingItem.populate(outfit.clothingItems, { path: 'userId' }); 
      return outfit;
    }));

    console.log("request body", populatedOutfits);
    
    res.status(200).json(populatedOutfits);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

