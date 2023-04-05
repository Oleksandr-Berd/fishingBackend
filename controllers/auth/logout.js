const { userModel } = require("../../models/index");

const logout = async (req, res) => {
  const { _id } = req.user;
  await userModel.findByIdAndUpdate(_id);
  res.status(204).json({
    status: "success",
    code: 204,
  });
};

module.exports = logout;

// await userModel.findByIdAndUpdate(
//   _id,
//   { token: null }
// );