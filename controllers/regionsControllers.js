const { regionsModel } = require("../models/index");
const { isValidObjectId } = require("mongoose");
const path = require("path");
const fs = require("fs/promises");
const { v4 } = require("uuid");

const regionsImageDir = path.join(__dirname, "..", "public", "regions");

let regionsImageArray = [];

class regionsController {
  getAll = async (req, res) => {
    const { query } = req.query
     const region = await regionsModel.find({});
    
    // const region = await regionsModel.find({});
    if (!region) {
      res.status(400);
      throw new Error("Unable to fetch the data");
    }
    let resultsRegions = region.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
    if (query) {
      const regex = new RegExp("^" + query.toLowerCase());
      resultsRegions = region.filter((el) =>
        regex.test(el.name.split(" ")[0].toLowerCase())
      );
}

    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};
    if (endIndex < resultsRegions.length) {
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

    results.results = resultsRegions.slice(startIndex, endIndex);

    res.paginatedResults = results;
    res.status(201).json({
      code: 200,
      message: "Successful success",
      data: results,
      quantity: resultsRegions.length,
    });
  };

  addImage = async (req, res) => {
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
}

module.exports = new regionsController();
