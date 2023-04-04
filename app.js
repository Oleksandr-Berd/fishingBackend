const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const path = require("path");
const pathToEnv = path.join(__dirname, "..", "config", ".env");
const dotenv = require("dotenv");
dotenv.config({ path: pathToEnv });
const locationsRouter = require("./routes/locationsRoutes");
const authRouter = require("./routes/authRoutes");
const regionsRouter = require("./routes/regionsRoutes");

require("colors");
let cors = require("cors");
const multer = require("multer");
app.use(cors({ origin: true }));
app.use("/public", express.static(path.join(__dirname, "..", "/public")));

app.use("/regions", locationsRouter);

app.use("/", regionsRouter);

app.use("/auth", authRouter);

module.exports = app;
