const express = require("express");
const regionsController = require("../controllers/regionsControllers");
// const upload = require("../middlewares/addNewData");
// const auth = require("../middlewares/auth");
const asyncHandler = require("express-async-handler");

const regionRouter = express.Router();

// regionRouter.post("/regions", regionsController.add);
// regionRouter.post(
//   "/regions/newData",
//   upload.single("image"),
//   regionsController.addImageRegion
// );
// regionRouter.patch(
//   "/regions/newData/:id",
//   asyncHandler(regionsController.updateImageRegion)
// );
regionRouter.get("/regions/paginate", asyncHandler(regionsController.getAll));
// regionRouter.get("/regions/:id", asyncHandler(regionsController.getOne));
// regionRouter.put("/regions/:id", asyncHandler(regionsController.update));
// regionRouter.patch(
//   "/regions/:id",
//   asyncHandler(regionsController.updateDetail)
// );
// regionRouter.delete("/regions/:id", asyncHandler(regionsController.remove));

module.exports = regionRouter;
