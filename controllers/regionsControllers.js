const { regionsModel } = require("../models/index");
const { isValidObjectId } = require("mongoose");
const path = require("path");
const fs = require("fs/promises");
const { v4 } = require("uuid");

const regionsImageDir = path.join(__dirname, "..", "public", "region");

let regionsImageArray = [];

class regionsController {
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
}

module.exports = new regionsController();
