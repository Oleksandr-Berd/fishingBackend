const express = require("express");
const regionsController = require("../controllers/regionsControllers");
// const upload = require("../middlewares/addNewData");
// const auth = require("../middlewares/auth");
const asyncHandler = require("express-async-handler");

const regionRouter = express.Router();

regionRouter.get("/regions/paginate", asyncHandler(regionsController.getAll));

module.exports = regionRouter;
