const User = require("../models/user");
const bcrypt = require("bcrypt");

exports.authenticateUSer = async (req, res) => {
  try {
    const { email } = req.body;

    const userRes = await User.findAll({
      where: {
        email: email,
      },
    });

    return res.status(200).json({
      success: true,
      message: "email verified",
      username: userRes[0].username,
      email: userRes[0].email,
    });
  } catch (error) {
    res.status(404).json({ success: false, message: "user not found" });
  }
};

exports.resetUserPassword = async (req, res) => {
  try {
    const { password, email } = req.body;

    if (!password && !email) {
      return null;
    }

    const user = await User.findOne({
      where: {
        email: email,
      },
    });
    console.log(user);
    if (!user) return null;

    bcrypt.hash(password, 10, async function (err, hash) {
      if (err) throw Error(err);

      await user.update({
        psw: hash,
      });

      await user.save();

      return res
        .status(200)
        .json({ success: true, message: "password reset succesfully" });
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "password has not saved due to some issue",
    });
  }
};
