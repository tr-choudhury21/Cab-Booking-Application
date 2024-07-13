const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const UserSchema = new mongoose.Schema({
  username: {
      type: String, 
      required: [true, "username is required"]
  },

  email: { 
    type: String, 
    required: [true, "email is required"], 
    unique: true
  },

  password: {
    type: String, 
    required: [true, "password is required"]
  },

  isAdmin: {
    type: Boolean, 
    default: false 
  },

  isDriver: { 
    type: Boolean, 
    default: false 
  },

  role: {
    type: String,
    required: [true, "User Role Required!"],
    enum: ["User", "Driver", "Admin"],
  },

  firstName: {
    type: String,
    trim: true
  },

  lastName: {
    type: String,
    trim: true
  },

  phone: {
    type: String,
  },

  address: {
    type: String,
  },

  city: {
    type: String,
  },

  pin: {
    type: Number,
  },

  licenseNumber: {
    type: String,
    required: true,
    unique: true
  },

  cabId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cab',
  },

  rating: {
    type: Number,
    default: 0
  },

  createdAt: {
    type: Date,
    default: Date.now
  },

  cabNumbers: {
    type: Number,
    default: 0,
  },

  cabRegistration: {
    type: String,
    unique: true,
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
