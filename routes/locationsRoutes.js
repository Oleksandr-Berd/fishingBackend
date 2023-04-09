const express = require("express");
const LocationsControllers = require("../controllers/locationsControllers");
const uploadCloud = require("../Middleware/uploadMiddleware");
const {auth} = require("../Middleware/index");
const asyncHandler = require("express-async-handler");

const locationsRouter = express.Router();

locationsRouter.post("/locations/:locPath",auth, LocationsControllers.add);
locationsRouter.get(
  "/paginate/:locPath",
  asyncHandler(LocationsControllers.getAll)
);
locationsRouter.get(
  "/locations/:locPath/:id", auth,
  asyncHandler(LocationsControllers.getOne)
);
locationsRouter.put(
  "/locations/:locPath/:id", auth,
  asyncHandler(LocationsControllers.update)
);
locationsRouter.patch(
  "/locations/:locPath/:id", auth,
  asyncHandler(LocationsControllers.updateDetail)
);
locationsRouter.delete(
  "/locations/:locPath/:id", auth,
  asyncHandler(LocationsControllers.remove)
);

locationsRouter.post(
  "/uploadImage/:locPath/:id",
  auth,
  uploadCloud.array("images", 50),
  LocationsControllers.addImage
);

module.exports = locationsRouter;
