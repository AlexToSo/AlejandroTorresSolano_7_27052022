const multer = require('multer');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

// Images storage configuration
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images');
    },
    filename: (req, file, callback) => {
        const extension = MIME_TYPES[file.mimetype];
        const name = req.auth.user_id;
        callback(null, name + '_' + Date.now() + '.' + extension);
    }
});

module.exports = multer({ storage: storage }).single('image');