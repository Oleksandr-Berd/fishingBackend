const express = require("express");
const LocationsControllers = require("../controllers/locationsControllers");
// const auth = require("../middlewares/auth");
const asyncHandler = require("express-async-handler");

const locationsRouter = express.Router();

// locationsRouter.post("/locations/:locPath", LocationsControllers.add);
locationsRouter.get(
  "/paginate/:locPath",
  asyncHandler(LocationsControllers.getAll)
);
// locationsRouter.get(
//   "/locations/:locPath/:id",
//   asyncHandler(locController.getOne)
// );
// locationsRouter.put(
//   "/locations/:locPath/:id",
//   asyncHandler(locController.update)
// );
// locationsRouter.patch(
//   "/locations/:locPath/:id",
//   asyncHandler(LocationsControllers.updateDetail)
// );
// locationsRouter.delete(
//   "/locations/:locPath/:id",
//   asyncHandler(LocationsControllers.remove)
// );

module.exports = locationsRouter;
