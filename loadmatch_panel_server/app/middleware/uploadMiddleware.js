//Configuring Multer for file Upload to S3
const multer = require("multer");
const multerS3 = require("multer-s3");
const s3 = require("../config/s3.config");
const uploadMiddleware = multer({
  storage: multerS3({
    s3: s3,
    bucket: "loadmatch-liteapp-db",
    acl: "public-read",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + "-" + file.originalname);
    },
  }),
});

module.exports = uploadMiddleware;
