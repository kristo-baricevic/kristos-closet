const express = require('express');
const router = express.Router();
const { protectRoute } = require('../middleware/authMiddleware');
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

// Image routes
router.get('/images', protectRoute, getImages);
router.put('/images/:id', protectRoute, updateImage);
router.delete('/images/:id', protectRoute, deleteImage);

// Upload route
router.post('/upload', protectRoute, uploadImage, handleUpload);

// User routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', protectRoute, logoutUser);
router.post('/loginAnonymous', loginAnonymous);
router.get('/current', protectRoute, getCurrentUserData);

module.exports = router;
