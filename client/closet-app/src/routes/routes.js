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

// Wardrobe routes
router.post('/wardrobe', verifyToken, addToWardrobe);
router.delete('/wardrobe/:id', verifyToken, removeFromWardrobe);



module.exports = router;
