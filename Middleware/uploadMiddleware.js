// const cloudinary = require("cloudinary").v2;
// const { CloudinaryStorage } = require("multer-storage-cloudinary");
// const multer = require("multer");
// const path = require("path");

// require("colors");

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_NAME,
//   api_key: process.env.CLOUDINARY_KEY,
//   api_secret: process.env.CLOUDINARY_SECRET,
// });

// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   folder: "regions",
//   allowedFormats: ["jpg", "png"],
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
// });

// const uploadCloud = multer({ storage });

// module.exports = uploadCloud;
const multer = require("multer");
const path = require("path");
const fs = require("fs/promises");
const cloudinary = require("cloudinary").v2;
const pathToEnv = path.join(__dirname, "..", "config", ".env");
const dotenv = require("dotenv");
dotenv.config({ path: pathToEnv });

const { CLDNRY_CLOUD_NAME, CLDNRY_API_KEY, CLDNRY_API_SECRET } = process.env;

cloudinary.config({
  cloud_name: CLDNRY_CLOUD_NAME,
  api_key: CLDNRY_API_KEY,
  api_secret: CLDNRY_API_SECRET,
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, "./../data/regions"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

console.log("console", CLDNRY_CLOUD_NAME);
const uploadMiddleware = multer({
  storage,
  limits: {
    fileSize: 10485760,
  },
});
async function uploadToCloud(filename, storeImage) {
  const cloudres = cloudinary.uploader.upload(storeImage, {
    public_id: filename,
  });
  return cloudres
    .then((data) => {
      return data.secure_url;
    })
    .catch((error) => {
      console.error(error);
    });
}

async function urlToImage(req, res, next) {
  const filename = req.file.filename;
  const filepath = req.file.path;
  const storeImage = path.resolve(filepath);

  try {
    const url = await uploadToCloud(filename, storeImage);
    await fs.unlink(filepath);
    return res.status(200).json({ urlImage: url });
  } catch (error) {
    console.error("Error", error.message);
    return res.status(500).json({ message: error.message });
    // next(error);
  }
}

module.exports = {
  uploadMiddleware,
  urlToImage,
};
