const multer = require('multer');

// Configure multer
const storage = multer.memoryStorage(); // Store uploaded files in memory as buffers
const upload = multer({ storage });

// Middleware function to handle single file upload
const singleUpload = upload.single('file');

module.exports = { singleUpload };
