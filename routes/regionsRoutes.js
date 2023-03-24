const express = require("express");
const regionsController = require("../controllers/regionsControllers");
// const upload = require("../middlewares/addNewData");
// const auth = require("../middlewares/auth");
const asyncHandler = require("express-async-handler");
const uploadCloud = require("../Middleware/uploadMiddleware");
const { urlToImage } = require("../Middleware/uploadMiddleware");
const regionRouter = express.Router();
console.log("console", uploadCloud.single("image"));
regionRouter.get("/regions/paginate", asyncHandler(regionsController.getAll));
regionRouter.post(
  "/uploadImage",
  uploadCloud.single("image"),
  regionsController.addImage
);
regionRouter.patch(
  "/uploadImage/:id",
  asyncHandler(regionsController.updateImage)
);

module.exports = regionRouter;
