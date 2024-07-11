const userModel = require("../models/userModel.js");
// const driverModel = require("../models/driverModel.js");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/jwtToken.js");

const registerController = async (req, res) => {

  const {username, email, password} = req.body;

  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res
        .status(200)
        .send({ message: "User Already Exists", success: false });
    }

    const user = new userModel({ username, email, password });
    await user.save();
    generateToken(user, "User Registered Successfully!", 201, res);

    }
  catch (error) {
    res.status(400).send({
      success: false,
      message: `${error.message}`
    });
  }
};

const loginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({email});
    if (!user) {
      return res
        .status(200)
        .send({ message: "user not found", success: false });
    }
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res
        .status(200)
        .send({ message: "Invalid Email or Password", success: false });
    }

    generateToken(user, "User Logged in successfully", 200, res);

    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: `Error in Login CTRL ${error.message}` });
  }
};

const authController = async (req, res) => {
  try {
    const user = await userModel.findById({ _id: req.body.userId });
    user.password == undefined;
    if (!user) {
      return res.status(200)({
        message: " user not found",
        success: false
      });
    } else {
      res.status(200).send({
        success: true,
        data: user
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "auth error",
      success: false,
      error
    });
  }
};

const logoutUser = async(req, res, next) => {
  res.status(200).cookie("userToken", "", {
    httpOnly: true,
    expires: new Date(Date.now()),
  }).json({
    success: true,
    message: "User logged out successfully!"
  });
};

module.exports = { registerController, loginController, authController, logoutUser };
