const express = require("express");

const routerAuth = express.Router();
const {googleAuth} = require("../controllers/auth/googleAuth")
const { register, login, logout } = require("../controllers/auth/index");
const {
  userRegisterValidation,
  userLoginValidation,
  auth,
} = require("../Middleware/index");

routerAuth.get("/google", googleAuth);

routerAuth.post("/register", userRegisterValidation, register);

routerAuth.post("/login", userLoginValidation, login);

routerAuth.get("/logout", auth, logout);

routerAuth.get("/me", auth);

module.exports = routerAuth;
