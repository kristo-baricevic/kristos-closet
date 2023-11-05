const SavedOutfit = require("../models/SavedOutfit");

exports.addToWardrobe = async (req, res) => {
  try {
    const { outfit, userId } = req.body;

    // Create a new SavedOutfit document for the wardrobe
    const wardrobeOutfit = new SavedOutfit({
      outfit,
      userId,
    });

    // Save the wardrobe outfit to the database
    await wardrobeOutfit.save();

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
    await SavedOutfit.findOneAndDelete({ _id: wardrobeOutfitId });

    res.json({ message: 'Outfit removed from the wardrobe successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while removing the outfit from the wardrobe' });
  }
};

exports.getWardrobeOutfits = async (req, res) => {
  try {
    console.log("in get wardrobe controller");
    const userId = req.params.user; // Assuming you pass the user's ID as a parameter

    // Retrieve all outfits in the wardrobe for the given user
    const wardrobeOutfits = await SavedOutfit.find({ userId });

    res.json(wardrobeOutfits);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching wardrobe outfits' });
  }
};
