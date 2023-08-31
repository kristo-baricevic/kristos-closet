const multer = require('multer');

// Create a storage engine using GridFS ** make sure directory exists
const storage = multer.diskStorage({
  destination: './images', 
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}--${file.originalname}`);
  },
});

// Set up multer with the configured storage engine
const upload = multer({ storage });

module.exports = upload;
