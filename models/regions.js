const { model, Schema } = require("mongoose");

const schemaRegion = Schema({
  name: {
    type: String,
    required: [true, "DB: name is required"],
  },
  path: {
    type: String,
    required: [true, "DB: path is required"],
  },
  image: {
    type: Array,
  },
});

module.exports = model("regions", schemaRegion);
