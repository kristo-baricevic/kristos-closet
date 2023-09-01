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


// Image routes
router.get('/images', getImages);
router.put('/images/:id', verifyToken, updateImage);
router.get('/images/:id', getImageById);
router.delete('/images/:id', verifyToken, deleteImage);

router.post('/loginAnonymous', userController.loginAnonymous);
// router.get('/current', verifyToken, userController.getCurrentUserData);

module.exports = router;