const express = require("express");
const regionsController = require("../controllers/regionsControllers");
// const upload = require("../middlewares/addNewData");
// const auth = require("../middlewares/auth");
const asyncHandler = require("express-async-handler");
const { uploadMiddleware } = require("../Middleware/uploadMiddleware");
const { urlToImage } = require("../Middleware/uploadMiddleware");
const regionRouter = express.Router();

regionRouter.get("/regions/paginate", asyncHandler(regionsController.getAll));
regionRouter.post("/uploadImage", uploadMiddleware.single("image"), urlToImage);

module.exports = regionRouter;
