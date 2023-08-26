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
const WebSocket = require('ws'); // Import WebSocket library


// Create a WebSocket server
const wss = new WebSocket.Server({ noServer: true });

// Attach the WebSocket server to the existing HTTP server
app.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (socket) => {
    wss.emit('connection', socket, request);
  });
});

// Handle WebSocket connections
wss.on('connection', (socket) => {
  socket.on('message', async (message) => {
    try {
      const data = JSON.parse(message);

      if (data.type === 'login') {
        // Handle the login request, possibly by calling your controller method
        const response = await userController.handleLogin(data.data);
        const responseMessage = JSON.stringify({
          type: 'loginResponse',
          data: response,
        });
        socket.send(responseMessage);
      }
    } catch (error) {
      console.error(error);
    }
  });

  socket.on('close', () => {
    console.log('WebSocket connection closed');
  });
});

// Image routes
router.get('/images', getImages);
router.put('/images/:id', verifyToken, updateImage);
router.get('/images/:id', getImageById);
router.delete('/images/:id', verifyToken, deleteImage);

// Upload route
router.post('/upload', upload.single('imageFile'), uploadController.uploadImageAndMetaData);

// User routes
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.post('/logout', verifyToken, userController.logoutUser);
router.post('/loginAnonymous', userController.loginAnonymous);
router.get('/current', verifyToken, userController.getCurrentUserData);

module.exports = router;