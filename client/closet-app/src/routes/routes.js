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
router.get('/images', getImages);
router.put('/images/:id', verifyToken, updateImage);
router.delete('/images/:id', verifyToken, deleteImage);

// Upload route
// router.post('/upload', verifyToken, upload.single('imageFile'), uploadController.handleUpload);
router.post('/upload-to-db', verifyToken, uploadController.uploadMetaDataToMongo);
router.post('/upload-to-bunny', verifyToken, upload.single('imageFile'), uploadController.uploadImageToBunnyCDN);



// User routes
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.post('/logout', verifyToken, userController.logoutUser);
router.post('/loginAnonymous', userController.loginAnonymous);
router.get('/current', verifyToken, userController.getCurrentUserData);

// Example Express route to serve images
express.get('/images/:imageName', (req, res) => {
  const imageName = req.params.imageName;
  const bunnyCDNURL = 'closet-app.b-cdn.net';
  const imageUrl = `${bunnyCDNURL}${imageName}`;
  res.redirect(imageUrl);
});

module.exports = router;