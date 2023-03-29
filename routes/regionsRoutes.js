const express = require("express");
const regionsController = require("../controllers/regionsControllers");
// const upload = require("../middlewares/addNewData");
// const auth = require("../middlewares/auth");
const asyncHandler = require("express-async-handler");
const uploadCloud = require("../Middleware/uploadMiddleware");
const regionRouter = express.Router();
regionRouter.get("/regions/paginate", asyncHandler(regionsController.getAll));
regionRouter.post(
  "/uploadImage/:id",
  uploadCloud.single("image"),
  regionsController.addImage
);

module.exports = regionRouter;
