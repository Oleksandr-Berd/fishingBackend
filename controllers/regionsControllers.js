const { regionsModel } = require("../models/index");
const { isValidObjectId } = require("mongoose");
const path = require("path");
const fs = require("fs/promises");
const { v4 } = require("uuid");

const regionsImageDir = path.join(__dirname, "..", "public", "regions");

let regionsImageArray = [];

class regionsController {
  getAll = async (req, res) => {
    const region = await regionsModel.find({});
    if (!region) {
      res.status(400);
      throw new Error("Unable to fetch the data");
    }
    const resultsregions = region.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};
    if (endIndex < resultsregions.length) {
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

    results.results = resultsregions.slice(startIndex, endIndex);

    res.paginatedResults = results;
    res.status(201).json({
      code: 200,
      message: "Successful success",
      data: results,
      quantity: resultsregions.length,
    });
  };

  addImage = async (req, res) => {
    const { path: tempUpload, originalname } = req.file;

    const resultUpload = path.join(regionsImageDir, originalname);
    const image = path.join("regions", originalname);
    console.log("console", resultUpload);
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

  addImageTest = async (req, res) => {
    const { id } = req.params;
    const image = req.body;
    const data = !!req.file
      ? { imageURL: req.file.path, ...image }
      : { id, ...image };

    const regionsImage = await regionsModel.findByIdAndUpdate(id, {
      image: data.imageURL,
    });
    if (!regionsImage) {
      res.status(400);
      throw new Error("There is no location with this id");
    }

    res.status(200).json({
      code: 200,
      message: "Successful success",
      data: regionsImage,
    });
  };

  updateImage = async (req, res) => {
    const { id } = req.params;
    const regionsImage = await regionsModel.findByIdAndUpdate(id, {
      image: regionsImageArray,
    });
    if (!regionsImage) {
      res.status(400);
      throw new Error("There is no location with this id");
    }

    res.status(200).json({
      code: 200,
      message: "Successful success",
      data: regionsImage,
    });
  };
}

module.exports = new regionsController();
