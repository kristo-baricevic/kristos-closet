const express = require('express');
const router = express.Router();
const app = express();

const { verifyToken } = require('../middleware/authMiddleware');
const userController = require('../controllers/userController');
const uploadController = require('../controllers/uploadController');
const upload = require('../config/multer-config');
const {
  getImages,
  getImageById,
  updateImage,
  deleteImage,
} = require('../controllers/imagesController');
const outfitController = require('../controllers/outfitController');
const wardrobeController = require('../controllers/wardrobeController');


// Image routes
router.get('/images', getImages);
router.put('/images/:id', updateImage);
router.get('/images/:id', getImageById);
router.delete('/images/:id', deleteImage);

// Upload route
router.post('/upload', upload.single('imageFile'), uploadController.uploadImageAndMetaData);

// User routes
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.post('/logout', verifyToken, userController.logoutUser);
router.post('/loginAnonymous', userController.loginAnonymous);
router.get('/current', verifyToken, userController.getCurrentUserData);

// Outfit routes
router.post('/outfit', outfitController.saveOutfit);
router.delete('/outfit/:id', outfitController.deleteOutfit);
router.put('/outfit/:id', outfitController.updateOutfit);

// Wardrobe routes
router.post('/wardrobe', wardrobeController.addToWardrobe);
router.delete('/wardrobe/:id', wardrobeController.removeFromWardrobe);
router.get('/wardrobe/:userId', wardrobeController.getWardrobeOutfits);

module.exports = router;