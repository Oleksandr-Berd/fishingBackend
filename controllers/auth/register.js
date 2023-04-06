const { Conflict } = require("http-errors");
const { userModel } = require("../../models/index");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");

const SECRET_KEY = `${process.env.SECRET_KEY}`;
const register = async (req, res) => {
  const { password, email } = req.body;
  const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const user = await userModel.findOne({ email });
  if (user) {
    throw new Conflict(`This email: ${email} in use`);
  }
  const avatarURL = gravatar.url(email);

  
   
  const newUser = await userModel.create({
    ...req.body,
    password: passwordHash,
    email
  });
  const payload = { id: newUser.id };
  const token = jwt.sign(payload, SECRET_KEY);

    newUser.accessToken = token;

    const updated = await newUser.save();
    if (!updated) {
      res.status(400);
      throw new Error("Unable create user");
    }

   const { _id, name, accessToken,  } =
     newUser; 
  
  res.status(201).json({
    status: "success",
    code: 201,
    user: {
      id: _id,
      email: newUser.email,
      name,
      accessToken,
    },
  });
};

module.exports = register;
