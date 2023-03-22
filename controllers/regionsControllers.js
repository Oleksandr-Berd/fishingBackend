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
}

module.exports = new regionsController();
