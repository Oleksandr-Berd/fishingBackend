const { Conflict } = require("http-errors");
const { userModel } = require("../../models/index");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");

const SECRET_KEY = `${process.env.SECRET_KEY}`;
const register = async (req, res) => {
  const { password, email, login } = req.body;
  const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const user = await userModel.findOne({ email });
  if (user) {
    throw new Conflict(`This email: ${email} in use`);
  }
  const verificationToken = uuidv4();
  const avatarURL = gravatar.url(email);

  
   
  const newUser = await userModel.create({
    ...req.body,
    password: passwordHash,
    email,
  });
  const payload = { id: newUser.id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });

    newUser.token = token;

    const updated = await newUser.save();
    if (!updated) {
      res.status(400);
      throw new Error("Unable create user");
    }

  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      user: {
        login,
        email,
        avatarURL,
        subscription: "starter",
        token,
      },
    },
  });
};

module.exports = register;
