const { model, Schema } = require("mongoose");

const schemaLocations = Schema({
  title: {
    type: String,
    required: [true, "DB: title is required"],
  },
  picture: Array,
  coordinates: Object,
  adress: String,
  fish: {
    type: Array,
    required: [true, "DB: there should be some fish"],
  },
  fishingConditions: String,
  description: String,
  allowedTime: String,
  region: {
    type: String,
    required: [true, "DB: region is required"],
  },
});

module.exports = model("locations", schemaLocations);
