const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure upload directories exist
const uploadDirs = {
  photos: 'uploads/photos',
  documents: 'uploads/documents',
  audio: 'uploads/audio'
};

Object.values(uploadDirs).forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let uploadPath = uploadDirs.photos; // default

    // Determine upload path based on file type or field name
    if (file.fieldname === 'document' || file.mimetype === 'application/pdf') {
      uploadPath = uploadDirs.documents;
    } else if (file.fieldname === 'audio' || file.mimetype.startsWith('audio/')) {
      uploadPath = uploadDirs.audio;
    } else if (file.fieldname === 'photo' || file.mimetype.startsWith('image/')) {
      uploadPath = uploadDirs.photos;
    }

    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    // Generate unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    const basename = path.basename(file.originalname, ext).replace(/\s+/g, '-');
    cb(null, basename + '-' + uniqueSuffix + ext);
  }
});

// File filter
const fileFilter = (req, file, cb) => {
  // Allow images
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  }
  // Allow documents
  else if (file.mimetype === 'application/pdf' ||
           file.mimetype === 'application/msword' ||
           file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
    cb(null, true);
  }
  // Allow audio
  else if (file.mimetype.startsWith('audio/')) {
    cb(null, true);
  }
  else {
    cb(new Error('Invalid file type. Only images, PDFs, documents, and audio files are allowed.'), false);
  }
};

// Multer upload instance
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  }
});

module.exports = {
  upload,
  uploadDirs
};
