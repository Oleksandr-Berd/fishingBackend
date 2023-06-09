const { Unauthorized } = require("http-errors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { userModel } = require("../../models/index");
const SECRET_KEY = `${process.env.SECRET_KEY}`;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) {
    throw new Unauthorized(`Email ${email} is wrong`);
  }
  const passCompare = await bcrypt.compareSync(password, user.password);
  if (!passCompare) {
    throw new Unauthorized(`Password ${password} is wrong`);
  }
  if (!user.verify) {
    throw new Unauthorized(`User is not verified`);
  }

  const payload = { id: user.id };
  const token = jwt.sign(payload, SECRET_KEY);

  user.accessToken = token;
  req.session.userId = user.id;
  const updated = await user.save();
  if (!updated) {
    res.status(400);
    throw new Error("Unable create user");
  }

  const { _id, name, accessToken } = user;
  res.json({
    status: "success",
    code: 200,
    user: {
      id: _id,
      email: user.email,
      name,

      accessToken,
    },
  });
};

module.exports = login;
