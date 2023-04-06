const express = require("express");
const session = require("express-session");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: "your_secret_key_here",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);
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
app.get("/auth/me", (req, res) => {
    console.log(req.session);
  const userId = req.session.userId;
  // use userId to fetch user data or render page
});

module.exports = app;
