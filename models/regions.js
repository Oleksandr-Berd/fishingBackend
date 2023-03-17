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
  locations: {
    type: Schema.Types.ObjectId,
    ref: "locations",
  },
});

module.exports = model("regions", schemaRegion);
