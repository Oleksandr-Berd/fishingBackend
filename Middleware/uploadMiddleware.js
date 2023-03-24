const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const path = require("path");
const pathToEnv = path.join(__dirname, "..", "config", ".env");
const dotenv = require("dotenv");
dotenv.config({ path: pathToEnv });

// require("colors");

cloudinary.config({
  cloud_name: process.env.CLDNRY_CLOUD_NAME,
  api_key: process.env.CLDNRY_API_KEY,
  api_secret: process.env.CLDNRY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  folder: "regions",
  allowedFormats: ["jpg", "png", "jpeg"],
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

// const tempDir = path.join(__dirname, "../", "temp");

// const multerConfig = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, tempDir);
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
// });

const uploadCloud = multer({ storage });
module.exports = uploadCloud;
