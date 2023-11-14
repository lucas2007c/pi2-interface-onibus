const multer = require("multer");
const { v4: uuidv4 } = require('uuid');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads");
    },
    filename: function (req, file, cb) {
        cb(null, uuidv4() + file.originalname);
    },
});

const upload = multer({ storage: storage });

module.exports = upload;