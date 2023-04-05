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
    login: {
      type: String,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: String,
    avatarURL: {
      type: String,
    },
    verify: {
      type: Boolean,
      // default: false,
      default: true,
    },
   
  },

  { versionKey: false, timestamps: true }
);

 module.exports = model("user", userSchema);
