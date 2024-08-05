const AWS = require("@aws-sdk/client-s3");
const multer = require("multer");
const multerS3 = require("multer-s3");

const s3 = new AWS.S3({
  region: process.env.AWS_REGION,
  endpoint: "https://blr1.digitaloceanspaces.com", // Replace with your DigitalOcean Space endpoint URL
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

module.exports = s3;
