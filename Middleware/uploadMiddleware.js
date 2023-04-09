const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const path = require("path");
const pathToEnv = path.join(__dirname, "..", "config", ".env");
const dotenv = require("dotenv");
const { log } = require("console");
dotenv.config({ path: pathToEnv });

// const storage = multer.memoryStorage();
// const upload = multer({
//   storage,
//   limits: {
//     files: 5, // allow up to 5 files
//     fileSize: 5 * 1024 * 1024, // 5 MB (max file size)
//   },
// });

cloudinary.config({
  cloud_name: process.env.CLDNRY_CLOUD_NAME,
  api_key: process.env.CLDNRY_API_KEY,
  api_secret: process.env.CLDNRY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  folder: "regions",
  limits: {
    files: 50, // allow up to 5 files
  },
  allowedFormats: ["jpg", "png", "jpeg"],
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});



const uploadCloud = multer({ storage });
module.exports = uploadCloud;
