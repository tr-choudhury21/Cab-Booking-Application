const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserSchema = new mongoose.Schema({
  username: { type: String, required: [true, "username is required"] },
  email: { type: String, required: [true, "email is required"], unique: true },
  password: { type: String, required: [true, "password is required"] },

  isAdmin: { type: Boolean, default: false },
  isDriver: { type: Boolean, default: false },

  firstName: {
    type: String,
    // required: [true, "first name is required"],
    trim: true
  },
  lastName: {
    type: String,
    // required: [true, "last name is required"],
    trim: true
  },
  phone: {
    type: String,
    // required: [true, "phone no is required"]
  },

  address: {
    type: String,
    // required: [true, "address is required"]
  },
  city: {
    type: String,
    // required: [true, "city is required"]
  },
  pin: {
    type: Number,
    // required: [true, "pin is required"]
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      // required: true
    },
    coordinates: {
      type: [Number],
      // required: true
    }
  }
});


UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Match user entered password with hashed password in database
UserSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

UserSchema.methods.generateJsonWebToken = function(){
  return jwt.sign({id: this._id,}, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES,
  })
};


UserSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("User", UserSchema);
