const userModel = require("../models/userModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/jwtToken.js");


//User Registration

const userRegistration = async (req, res) => {

  const {username, email, password, role} = req.body;

  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res
        .status(200)
        .send({ message: "User Already Exists", success: false });
    }

    const user = new userModel({ username, email, password, role});
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


//All Login

const login = async (req, res) => {
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

    generateToken(user, `${user.role} Logged in successfully`, 200, res);

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


//Current User Details

const getUserDetails = async(req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
};



//User Logout

const logoutUser = async(req, res, next) => {
  res.status(200).cookie("userToken", "", {
    httpOnly: true,
    expires: new Date(Date.now()),
  }).json({
    success: true,
    message: "User logged out successfully!"
  });
};


//Admin Logout

const logoutAdmin = async(req, res, next) => {
  res.status(200).cookie("adminToken", "", {
    httpOnly: true,
    expires: new Date(Date.now()),
  }).json({
    success: true,
    message: "Admin logged out successfully!"
  });
};




//Driver Registration

const driverRegistration = async(req, res, next) => {

  const {username, email, password, role, firstName, lastName, phone, address, city, pin, licenseNumber} = req.body;

  try {
      const existingDriver = await userModel.findOne({ email });
      if (existingDriver) {
          return res
          .status(200)
          .send({ message: "User Already Exists", success: false });
      }
  
      const driver = new userModel({ username, email, password, role, firstName, lastName, phone, address, city, pin, licenseNumber });
      await driver.save();
      generateToken(driver, "Driver Registered Successfully!", 201, res);
  
  }
  catch (error) {
      res.status(400).send({
          success: false,
          message: `${error.message}`
      });
  }
};



//Driver Logout


const logoutDriver = async(req, res, next) => {
  res.status(200).cookie("driverToken", "", {
    httpOnly: true,
    expires: new Date(Date.now()),
  }).json({
    success: true,
    message: "Driver logged out successfully!"
  });
};

module.exports = { userRegistration, login, authController, getUserDetails, logoutUser, logoutAdmin, driverRegistration, logoutDriver };
