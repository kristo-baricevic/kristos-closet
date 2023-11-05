const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');
const { singleUpload } = require('../middleware/uploadMiddleware');
const userController = require('../controllers/userController');
const {
  getImages,
  updateImage,
  deleteImage,
} = require('../controllers/imagesController');
const {
  uploadImage,
  handleUpload,
} = require('../controllers/uploadController');
const {
  registerUser,
  loginUser,
  logoutUser,
  loginAnonymous,
  getCurrentUserData,
} = require('../controllers/userController');
const { addToWardrobe, removeFromWardrobe } = require('../controllers/wardrobeController');
const { saveOutfit, updateOutfit, deleteOutfit } = require('../../backend/controllers/outfitController');
const SavedOutfit = require('../../backend/models/SavedOutfit');

// Image routes
router.get('/images', verifyToken, getImages);
router.put('/images/:id', verifyToken, updateImage);
router.delete('/images/:id', verifyToken, deleteImage);

// Upload route
router.post('/upload', singleUpload, handleUpload);

// User routes
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.post('/logout', verifyToken, logoutUser);
router.post('/loginAnonymous', loginAnonymous);
router.get('/current', verifyToken, getCurrentUserData);

// Saved Outfits routes
router.post('/outfits', saveOutfit);
router.put('/outfits/:id', verifyToken, updateOutfit);
router.delete('/outfits/:id', verifyToken, deleteOutfit);

// Wardrobe routes
router.post('/wardrobe', verifyToken, addToWardrobe);
router.delete('/wardrobe/:id', verifyToken, removeFromWardrobe);

router.get('/savedOutfits', async (req, res) => {
  try {
    // Fetch saved outfits from the database
    const savedOutfits = await SavedOutfit.find().populate('clothingItems'); 

    res.json(savedOutfits);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
