const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');
const userController = require('../controllers/userController');
const uploadController = require('../controllers/uploadController');
const upload = require('../config/multer-config');
const {
  getImages,
  updateImage,
  deleteImage,
} = require('../controllers/imagesController');

// Image routes
router.get('/images', verifyToken, getImages);
router.put('/images/:id', verifyToken, updateImage);
router.delete('/images/:id', verifyToken, deleteImage);

// Upload route
router.post('/upload', verifyToken, upload.single('imageFile'), uploadController.handleUpload);

// User routes
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.post('/logout', verifyToken, userController.logoutUser);
router.post('/loginAnonymous', userController.loginAnonymous);
router.get('/current', verifyToken, userController.getCurrentUserData);

module.exports = router;
