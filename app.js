const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const path = require("path");
const pathToEnv = path.join(__dirname, "..", "config", ".env");
const dotenv = require("dotenv");
// const asyncHandler = require("express-async-handler");
dotenv.config({ path: pathToEnv });
const uploadCloud = require("./Middleware/uploadMiddleware");
const locationsRouter = require("./routes/locationsRoutes");
const regionsRouter = require("./routes/regionsRoutes");
// const authRouter = require("./routes/authRouter");
// const notFoundError = require("./middlewares/notFoundError");
// const errorHandler = require("./middlewares/errorHandler");
require("colors");
let cors = require("cors");
console.log(path.join(__dirname, "..", "/public"));
const multer = require("multer");
// const addNewDataRouterKyiv = require("./routes/addNewDataRouter");
app.use(cors({ origin: true }));
// app.use("/data/img_our_friend", express.static("./src/data/img_our_friend"));
app.use("/data", express.static(path.join(__dirname, "..", "/data")));
// app.use("/", addNewDataRouterKyiv);

// app.use("/", asyncHandler(authRouter));

app.use("/regions", locationsRouter);

app.use("/", regionsRouter);

// app.use("*", notFoundError);
// app.use(errorHandler);

module.exports = app;
