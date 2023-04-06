const { Schema, model } = require("mongoose");

const userSchema = Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    name: {
      type: String,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    avatarURL: {
      type: String,
    },
    verify: {
      type: Boolean,
      // default: false,
      default: true,
    },
    accessToken: {
      type: String,
      default: null,
    },
  },

  { versionKey: false, timestamps: true }
);

 module.exports = model("user", userSchema);
