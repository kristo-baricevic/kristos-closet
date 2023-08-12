const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');

// Create a storage engine using GridFS
const storage = new GridFsStorage({
  url: 'mongodb+srv://admin:0123456789@cluster0.rablf5o.mongodb.net/closet-app?retryWrites=true&w=majority',
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    const fileInfo = {
      filename: file.originalname,
      bucketName: 'imageData',
    };
    return fileInfo;
  },
});

// Set up multer with the configured storage engine
const upload = multer({ storage });

module.exports = upload;
