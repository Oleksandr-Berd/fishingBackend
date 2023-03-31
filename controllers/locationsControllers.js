const { locationsModel } = require("../models/index");
const { isValidObjectId } = require("mongoose");

class LocationsControllers {
  add = async (req, res) => {
    const { title, fish } = req.body;
    if (!title || !fish) {
      res.status(400);
      throw new Error("Please provide all required fields");
    }
    const location = await locationsModel.create({ ...req.body });

    if (!location) {
      res.status(400);
      throw new Error("Unable to save in a data base");
    }
    res
      .status(201)
      .json({ code: 201, message: "Successful success", data: location });
  };

  getAll = async (req, res) => {
    const { locPath } = req.params;
    const locations = await locationsModel.find({ region: locPath });

    if (!locations) {
      res.status(400);
      throw new Error("Unable to fetch the data");
    }
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};
    if (endIndex < locations.length) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }
    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }

    results.results = locations.slice(startIndex, endIndex);
    res.paginatedResults = results;

    res.status(201).json({
      code: 200,
      message: "Successful success",
      data: results,
      quantity: locations.length,
    });
  };

  getOne = async (req, res) => {
    const { id } = req.params;
    const validId = isValidObjectId(id);
    if (!validId) {
      res.status(400);
      throw new Error("Invalid id");
    }
    const location = await locationsModel.findById(id);
    if (!location) {
      res.status(400);
      throw new Error("There is no location with this id");
    }
    res.status(200).json({
      code: 200,
      message: "Successful success",
      data: location,
    });
  };

  update = async (req, res) => {
    const { id } = req.params;

    const location = await locationsModel.findByIdAndUpdate(id, req.body);
    if (!location) {
      res.status(400);
      throw new Error("There is no location with this id");
    }
    res.status(200).json({
      code: 200,
      message: "Successful success",
      data: location,
    });
  };

  updateDetail = async (req, res) => {
    const { id } = req.params;

    const location = await locationsModel.findByIdAndUpdate(id, req.body);
    if (!location) {
      res.status(400);
      throw new Error("There is no location with this id");
    }
    res.status(200).json({
      code: 200,
      message: "Successful success",
      data: location,
    });
  };

  remove = async (req, res) => {
    const { id } = req.params;
    const location = await locationsModel.findByIdAndDelete(id);
    if (!location) {
      res.status(400);
      throw new Error("There is no location with this id");
    }
    res.status(200).json({
      code: 200,
      message: "Successful success",
      data: location,
    });
  };

  addImage = async (req, res) => {
    const { id } = req.params;
    const image = req.body;
    const data = !!req.file
      ? { imageURL: req.file.path, ...image }
      : { id, ...image };

    const locationImage = await locationsModel.findByIdAndUpdate(id, {
      picture: data.imageURL,
    });
    if (!locationImage) {
      res.status(400);
      throw new Error("There is no location with this id");
    }

    res.status(200).json({
      code: 200,
      message: "Successful success",
      data: locationImage,
    });
  };
}

module.exports = new LocationsControllers();
