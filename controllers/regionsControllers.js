const { regionsModel } = require("../models/index");
const { isValidObjectId } = require("mongoose");
const path = require("path");
const fs = require("fs/promises");
const { v4 } = require("uuid");

const regionsImageDir = path.join(__dirname, "..", "public", "region");

let regionsImageArray = [];

class regionsController {
  add = async (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.status(400);
      throw new Error("Please provide all required fields");
    }
    const region = await regionModel.create({ ...req.body });

    if (!region) {
      res.status(400);
      throw new Error("Unable to save in a data base");
    }
    res
      .status(201)
      .json({ code: 201, message: "Successful success", data: region });
  };

  getAll = async (req, res) => {
    const region = await regionsModel.find({});
    if (!region) {
      res.status(400);
      throw new Error("Unable to fetch the data");
    }
    const regions = region.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};
    if (endIndex < regions.length) {
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

    results.results = regions.slice(startIndex, endIndex);

    res.paginatedResults = results;
    console.log(regions);
    res.status(201).json({
      code: 200,
      message: "Successful success",
      data: regions,
      quantity: regions.length,
    });
  };

  getOne = async (req, res) => {
    const { id } = req.params;
    const validId = isValidObjectId(id);
    if (!validId) {
      res.status(400);
      throw new Error("Invalid id");
    }
    const region = await regionsModel.findById(id);
    if (!region) {
      res.status(400);
      throw new Error("There is no location with this id");
    }
    res.status(200).json({
      code: 200,
      message: "Successful success",
      data: region,
    });
  };

  update = async (req, res) => {
    const { id } = req.params;

    const region = await regionsModel.findByIdAndUpdate(id, req.body);
    if (!region) {
      res.status(400);
      throw new Error("There is no location with this id");
    }
    res.status(200).json({
      code: 200,
      message: "Successful success",
      data: region,
    });
  };

  updateDetail = async (req, res) => {
    const { id } = req.params;
    const region = await regionsModel.findByIdAndUpdate(id, req.body);
    if (!region) {
      res.status(400);
      throw new Error("There is no location with this id");
    }
    res.status(200).json({
      code: 200,
      message: "Successful success",
      data: region,
    });
  };

  remove = async (req, res) => {
    const { id } = req.params;
    const region = await regionsModel.findByIdAndDelete(id);
    if (!region) {
      res.status(400);
      throw new Error("There is no location with this id");
    }
    res.status(200).json({
      code: 200,
      message: "Successful success",
      data: region,
    });
  };

  addImageRegion = async (req, res) => {
    const { path: tempUpload, originalname } = req.file;
    const resultUpload = path.join(regionsImageDir, originalname);
    const image = path.join("regions", originalname);
    try {
      await fs.rename(tempUpload, resultUpload);
      const newPicture = {
        name: req.body.name,
        id: v4(),
        image,
      };
      regionsImageArray.push(newPicture.image);
      res.status(201).json({ message: "Successful success" });
    } catch (error) {
      await fs.unlink(tempUpload);
      console.log(error.message);
    }
  };
  updateImageRegion = async (req, res) => {
    const { id } = req.params;
    const regionsImage = await regionsModel.findByIdAndUpdate(id, {
      image: regionsImageArray,
    });
    if (!regionsImage) {
      res.status(400);
      throw new Error("There is no location with this id");
    }

    res
      .status(200)
      .json({
        code: 200,
        message: "Successful success",
        data: regionsImage,
      })
      .then((regionsImageArray = []));
  };
}

module.exports = new regionsController();
