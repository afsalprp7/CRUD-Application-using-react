const multer = require("multer");

const storage = multer.diskStorage({
  destination : (req, file, cb) => {
    cb(null, "./uploadedImages");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const profileStg = multer({ storage: storage });

module.exports = { profileStg }  ;